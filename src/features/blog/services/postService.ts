import { graphqlRequest } from "../../../network/graphqlClient";
import { create_post, get_posts } from "../../../network/graphqlMutations";

export const getPosts = async () => {
    return await graphqlRequest(get_posts, { });
}

export const savePost = async (post: SavePost, token: string) => {
    return await graphqlRequest(create_post, { ...post, token });
}