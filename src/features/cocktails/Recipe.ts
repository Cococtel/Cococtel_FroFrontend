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
