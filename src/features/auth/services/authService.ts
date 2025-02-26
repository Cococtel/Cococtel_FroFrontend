import { graphqlRequest } from "../../../network/graphqlClient";
import type { UserLogin } from "../dtos/loginDto";
import type { UserRegistration } from "../dtos/registerDto";
import { login_mutation, resgister_mutation, verify_user } from "../../../network/graphqlMutations";

export const registerUser = async (user: UserRegistration) => {
    return await graphqlRequest(resgister_mutation, {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        image: user.image, 
        username: user.username,
        password: user.password,
        type: user.type,
    });
}

export const loginUser = async (user: UserLogin) => {
    return await graphqlRequest(login_mutation, {
        user: user.username,
        password: user.password,
        type: user.type,
    });
}

export const verifyUserLoginStatus = async (token: string) => {
    return await graphqlRequest(verify_user, { token });
};
  