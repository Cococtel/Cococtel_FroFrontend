import { GRAPHQL_API_ENDPOINT, GRAPHQL_API_KEY } from 'astro:env/client'

export const graphqlRequest = async(mutation: any, variables: any) => {
    try {
        const body = { query: mutation, variables: { ...variables } };
        if (variables.token) {
            body.variables.token = "Bearer " + variables.token;
        }

        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify(body),
        });
        
        const result = await response.json();
        
        return result;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}

export const graphqlRequestJSON = async(recipe: EditRecipe) => {
    try {
        const ingredientsArray = recipe.ingredients
            .map(i => `{ name: "${i.name}", quantity: "${i.quantity}" }`)
            .join(', ');

        const instructionsArray = recipe.instructions
            .map(i => `"${i}"`)
            .join(', ');

        const body = {
            query: `mutation {
                updateRecipe(
                _id: "${recipe.id}",
                name: "${recipe.name}",
                description: "${recipe.description}",
                category: "${recipe.category}",
                ingredients: [${ingredientsArray}],
                instructions: [${instructionsArray}],
                likes: ${recipe.likes},
                ) {
                    _id
                    name
                    category
                    description
                    createdAt
                }
            }`,
            variables: {}
        };

        console.log(body);

        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify(body),
        });
        
        const result = await response.json();
        
        return result;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}
