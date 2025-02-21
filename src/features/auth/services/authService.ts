import type { UserLogin } from "../dtos/loginDto";
import type { UserRegistration } from "../dtos/registerDto";
import { GRAPHQL_API_ENDPOINT, GRAPHQL_API_KEY } from 'astro:env/client'

export const registerUser = async (user: UserRegistration) => {
    
    const mutation = `
        mutation RegisterUser(
            $name: String!,
            $lastname: String!,
            $phone: String!,
            $email: String!,
            $image: String,
            $username: String!,
            $password: String!,
            $type: String!
        ) {
            register(
                name: $name,
                lastname: $lastname,
                phone: $phone,
                email: $email,
                image: $image,
                username: $username,
                password: $password,
                type: $type
            ) {
                data {
                    user_id
                    name
                    email
                }
                error {
                    message
                    status
                }
            }
        }
    `;
    
    const variables = {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        image: user.image, 
        username: user.username,
        password: user.password,
        type: user.type,
    };

    try {
        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify({ query: mutation, variables }),
        });
        
        const result = await response.json();
        
        return result;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}

export const loginUser = async (user: UserLogin) => {

    const mutation = `
        mutation LoginUser(
            $user: String!,
            $password: String!,
            $type: String!
        ) {
            login(
                user: $user,
                password: $password,
                type: $type
            ) {
                data {
                    name
                    token
                }
                error {
                    message
                    status
                }
            }
        }
    `;
    
    const variables = {
        user: user.username,
        password: user.password,
        type: user.type,
    };

    try {
        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify({ query: mutation, variables }),
        });
        
        const result = await response.json();

        return result;
    } catch (error) {
        return error;
    }
}

export const verifyUserLoginStatus = async (token: string) => {
    const query = `
        query VerifyUser($token: String!) {
            verify(token: $token) {
                data
                error {
                    message
                    status
                }
            }
        }
    `;
  
    const variables = {
        token: token,
    };
  
    try {
        const response = await fetch(GRAPHQL_API_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': GRAPHQL_API_KEY || '',
            },
            body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
  };
  

