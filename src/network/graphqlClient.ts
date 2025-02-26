import { GRAPHQL_API_ENDPOINT, GRAPHQL_API_KEY } from 'astro:env/client'

export const graphqlRequest = async(mutation: any, variables: any) => {
    try {
        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify({ query: mutation, variables:{
                ...variables
            } }),
        });
        
        const result = await response.json();
        
        return result;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}
