import { GRAPHQL_API_ENDPOINT, GRAPHQL_API_KEY } from 'astro:env/client'
import { graphqlRequest } from '../../../network/graphqlClient';
import {  createAIRecipeMutation, extract_text_from_image, get_liquor_data } from '../../../network/graphqlMutations';

export async function translateLiquorData(liquor: Liquor)
{
    const apiUrl = "https://aiservicesms-efgmfubkcdggh9hc.canadacentral-01.azurewebsites.net/api/AI/TranslateLiquorDetails";

    try {

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(liquor)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error extracting text from image:", error);
        return null;
    }
}

export async function getLiquorData(code: string)
{
    return await graphqlRequest(get_liquor_data, { code });
}

export async function createCocktail(liquor: string)
{
    return await graphqlRequest(createAIRecipeMutation(liquor), {  });
}

export async function extractTextFromImage(imageBase64: string) {
    return await graphqlRequest(extract_text_from_image, { imageBase64 });
}

// Function to Convert Base64 String to a File
function base64ToFile(base64String: string, filename: string): File {
    // Remove the Data URL prefix if present
    const base64Data = base64String.split(",")[1];

    if (!base64Data) {
        throw new Error("Invalid Base64 format. No data found.");
    }

    // Decode Base64
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    return new File([blob], filename, { type: "image/jpeg" });
}