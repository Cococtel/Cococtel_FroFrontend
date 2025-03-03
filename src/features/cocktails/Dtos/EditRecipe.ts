interface EditRecipe {
    id: string;
    category: string;
    creatorId: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    ratings: Rating[];
    rating: number;
    likes: number;
    name: string;
}