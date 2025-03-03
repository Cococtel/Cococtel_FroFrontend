interface CreateRecipe {
    category: string;
    creatorId: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    name: string;
}