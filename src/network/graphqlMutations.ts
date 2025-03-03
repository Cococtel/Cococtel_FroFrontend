export const resgister_mutation = `
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

export const login_mutation = `
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

export const verify_user = `
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

export const user_profile_mutation = `
    query UserProfile(
        $id: String!,
        $token: String!
    ){
        getUser(
            id: $id,
            token: $token
        ) {
            data {
                user_id
                name
                lastname
                phone
                email
                image
                username
            }
            error {
                message
                status
            }
        }
    }
`;

export const user_edit_profile_mutation = `
    mutation EditProfile(
        $token: String!,
        $name: String!,
        $lastname: String,
        $email: String!,
        $phone: String,
        $username: String,
        $image: String
    ){
        editProfile(
            user: {
                name: $name,
                lastname: $lastname,
                email: $email,
                phone: $phone,
                username: $username,
                image: $image
            }
            token: $token,
        ) {
            data 
            error {
                message
                status
            }
        }
    }
`;

export const get_all_recipes = `
    query GetAllRecipes {
        recipes {
            data {
                _id
                name
                category
                ingredients {
                    name
                    quantity
                }
                instructions
                creatorId
                rating
                likes
                liquors
                createdAt
                ratings{
                    user_id
                    rating
                }
                description
                averageRating
            }
            error {
                message
                status
            }
        }
    }
`;

export const get_recipe = `
    query GetRecipe($id: String!) {
        recipe(_id: $id) {
            data {
                _id
                name
                category
                ingredients {
                    name
                    quantity
                }
                instructions
                creatorId
                rating
                likes
                liquors
                createdAt
                ratings{
                    user_id
                    rating
                }
                description
                averageRating
            }
            error {
                message
                status
            }
        }
    }
`;

export const create_recipe = `
    mutation CreateRecipe(
        $name: String!,
        $category: String!,
        $ingredients: [IngredientInput]!,
        $instructions: [String!],
        $creatorId: String!,
        $description: String!,
    ) {
        createRecipe(
            name: $name,
            category: $category,
            ingredients: $ingredients,
            instructions: $instructions,
            creatorId: $creatorId,
            description: $description,
        ) {
            _id
            name
            category
            createdAt
            description
        }
    }
`;

export const update_recipe = `
    query UpdateRecipe(
        $id: String!,
        $name: String!,
        $category: String!,
        $ingredients: [Ingredient]!,
        $instructions: [String!]!,
        $description: String!,
        $likes: Int!,
        $user_id: String!,
        $rating: Int!
    ) {
        updateRecipe(
            _id: $id,
            name: $name,
            category: $category,
            ingredients: $ingredients,
            instructions: $instructions,
            description: $description,
            likes: $likes,
            ratings: {
                user_id: $user_id,
                rating: $rating
            }
        ) {
            _id
            name
            category
            createdAt
            description
        }
    }
`;

export const extract_text_from_image = `
    mutation ExtractTextFromImageBytes($imageBase64: String!) {
        extractTextFromImageBytes(imageBase64: $imageBase64) {
            data
            error {
                message
                status
            }
        }
    }
`;

export const delete_recipe = `
    mutation DeleteRecipe(
        $id: String!
    ) {
        deleteRecipe(
            _id: $id,
        ) 
    }
`;

export const like_recipe = `
    mutation UpdateRecipe(
        $id: String!,
        $likes: Int!,
    ) {
        updateRecipe(
            _id: $id,
            likes: $likes,
        ) {
            data {
                _id
                name
                category
                createdAt
                description
            }
            error {
                message
                status
            }
        }
    }
`;

export const rate_recipe = `
    mutation UpdateRecipe(
        $id: String!,
        $user_id: String!,
        $rating: Int!,
    ) {
        updateRecipe(
            _id: $id,
            ratings: {
                user_id: $user_id,
                rating: $rating
            }
        ) {
            data {
                _id
                name
                category
                createdAt
                description
            }
            error {
                message
                status
            }
        }
    }
`;

export const get_posts = `
    query GetPosts {
        posts {
            data {
                _id
                urlImage
                title
                content
                author
                createdAt
                interactions
                { 
                    type 
                    value 
                    userId 
                    createdAt 
                }
            }
            error {
                message
                status
            }
        }
    }
`;

export const create_post = `
    mutation CreatePost(
        $title: String!,
        $content: String!,
        $image: String,
    ) {
        createPost(
            title: $title,
            content: $content,
            image: $image
        ) {
            data {
                _id
                urlImage
                title
                content
                author
                createdAt
                interactions
                { 
                    type 
                    value 
                    userId 
                    createdAt 
                }
            }
            error {
                message
                status
            }
        }
    }
`;

export const get_liquor_data = `
    query GetProductByCode($code: String!) {
        getProductByCode(code: $code) {
            data {
                name
                photo_link
                description
                additional_attributes
                isbn
            }
            error {
                message
                status
            }
        }
    }
`;

export const createAIRecipeMutation = (liquor: string) => `
    mutation {
        createAIRecipe(liquor: "${liquor}") {
            data {
                    cocktailName
                    ingredients {
                            name
                            quantity
                    }
                    steps
                    observations
            }
            error {
                    message
                    status
            }
        }
    }
`;