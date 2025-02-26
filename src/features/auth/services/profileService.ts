import { graphqlRequest } from "../../../network/graphqlClient";
import { user_edit_profile_mutation, user_profile_mutation } from "../../../network/graphqlMutations";
import type { EditUserProfile } from "../dtos/editUserProfileTdto";
import type { GetUserProfile } from "../dtos/getProfileDto";

export const getProfileData = async (request: GetUserProfile) => {
    return await graphqlRequest(user_profile_mutation, {
        id: request.id,
        token: "Bearer " + request.token
    });
}

export const updateProfileData = async (request: EditUserProfile) => {
    console.log(request);
    return await graphqlRequest(user_edit_profile_mutation, {
        name: request.name,
        lastname: request.lastname || "",
        email: request.email,
        phone: "",
        token: "Bearer " + request.token
      })
}