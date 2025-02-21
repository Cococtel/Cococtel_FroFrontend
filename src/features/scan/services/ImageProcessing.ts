import { GRAPHQL_API_ENDPOINT, GRAPHQL_API_KEY } from 'astro:env/client'

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
    const query = `
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

    const variables = { code };

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
}

export async function createCocktail(liquor: string)
{
    const mutation = `
        mutation CreateAIRecipe($liquor: String!) {
            createAIRecipe(liquor: $liquor) {
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
    
    const variables = { liquor };

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
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function extractTextFromImage(base64Image: string) {
    const apiUrl = "https://imageprocessingms-f2hrh6crfsa2gyeu.canadacentral-01.azurewebsites.net/api/ImageRecognition/ExtractTextFromImage";

    // Convert Base64 to File
    const file = base64ToFile(base64Image, "image.jpg"); // Ensure correct file type

    // Create FormData object
    const formData = new FormData();

    try {
        formData.append("imageFile", file, "image.png");

        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
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