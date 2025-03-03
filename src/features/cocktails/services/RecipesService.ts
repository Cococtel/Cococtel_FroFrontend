import { graphqlRequest, graphqlRequestJSON } from "../../../network/graphqlClient";
import { create_recipe, delete_recipe, get_all_recipes, get_recipe, like_recipe, rate_recipe, update_recipe } from "../../../network/graphqlMutations";

export const getAllRecipes = async () => {
    return await graphqlRequest(get_all_recipes, { });
}

export const getRecipe = async (id: string) => {
    return await graphqlRequest(get_recipe, { id });
}

export const likeRecipe = async (id: string) => {
    const recipe = await getRecipe(id);

    if(recipe.data && recipe.data.recipe) {
        const likes = recipe.data.recipe.data.likes + 1;

        return await graphqlRequestJSON({ ...recipe.data.recipe.data, likes });
    }

}

export const createRecipe = async (recipe: CreateRecipe) => {
    return await graphqlRequest(create_recipe, recipe);
}

export const updateRecipe = async (recipe: EditRecipe) => {
    return await graphqlRequest(update_recipe, recipe);
}

export const updateRecipeRating = async (id: string, rating: number, user_id: string) => {
    return await graphqlRequest(rate_recipe, { id, user_id, rating });
}

export const getUserRecipes = async (id: string) => {
    const cocktails = await graphqlRequest(get_all_recipes, { });

    if(cocktails.data && cocktails.data.recipes) {
        console.log(cocktails.data.recipes);
        return cocktails.data.recipes.data.filter((recipe: Recipe) => recipe.creatorId === id);
    }
}

export const deleteRecipe = async (id: string) => {
    return await graphqlRequest(delete_recipe, { id });
}

export const isLikedByUser = async (id: string) => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    return likedItems.includes(id);
}

export const toggleLike = async (id: string) => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');

    if (likedItems.includes(id)) {
        const updatedLikedItems = likedItems.filter((id: string) => id !== id);
        localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));

        

        return false;
    } 

    const response = await likeRecipe(id);
    console.log(response);
    likedItems.push(id);
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    return true;
}