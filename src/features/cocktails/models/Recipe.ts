interface Ingredient {
    name: string;
    quantity: string;
}

interface Cocktail {
    cocktailName: string;
    ingredients: Ingredient[];
    steps: string[];
    observations: string;
}

interface Rating {
    rating: number;
    user_id: string;
}

interface Recipe {
    _id: string;
    averageRating: number;
    category: string;
    createdAt: string;
    creatorId: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    likes: number;
    liquors: string[];
    name: string;
    rating: number;
    ratings: Rating[];
}
