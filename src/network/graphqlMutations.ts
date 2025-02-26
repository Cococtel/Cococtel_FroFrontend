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
        $phone: String
    ){
        editProfile(
            user: {
                name: $name,
                lastname: $lastname,
                email: $email,
                phone: $phone
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