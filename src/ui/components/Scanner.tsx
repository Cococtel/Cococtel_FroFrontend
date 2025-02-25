import { toast } from 'sonner';
import { createCocktail, extractTextFromImage, getLiquorData, translateLiquorData } from '../../features/scan/services/ImageProcessing';
import WebcamCapture from './WebcamCapture';
import React, { useEffect } from 'react';

export default function ScanPage() {
    const [image, setImage] = React.useState<string | null>(null);
    const [liquor, setLiquor] = React.useState<Liquor | null>(null);
    const [loading, setLoading] = React.useState({loading: false, text: ""});
    const [recipe, setRecipe] = React.useState<Cocktail | null>(null);

    useEffect(() => {
        if (!image) return;
        getTextFromImage(image);
    }, [image]);

    useEffect(() => {
        if (!liquor) return;
        setLoading({loading: true, text: "Creando la receta..."});
        createRecipe(liquor.Name);
    }, [liquor]);

    useEffect(() => {
        setLoading({loading: false, text: ""});
    }, [recipe]);

    const handleSendImage = async(image: string) => {
        setLoading({loading: true, text: "Procesando la imagen..."});
        setImage(image);
    };

    const getTextFromImage = async (base64Image: string) => {
        const text = await extractTextFromImage(base64Image);
        const filteredText = text.map((str: any) => str.replace(/\s/g, ""))
          .map((str: any) => str.match(/\d{13}/)?.[0]) // Extract only 13-digit numbers
          .filter(Boolean);

        getLiquorDetails(filteredText[0]);
    }

    const getLiquorDetails = async (code: string) => {
        if(!code)
        {
            toast.error("Código no encontrado");
            
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return;
        }

        const cleanCode = encodeURIComponent(code.trim());
        //const liquor = await getLiquorData(cleanCode);
        
        const liquor = {
            data: {
                getProductByCode: {
                    data: {
                        "Name": "Vinho Chileno Branco Alto Los Romeros Sauvignon Blanc 750ml",
                        "Photo_link": "https://go-upc.s3.amazonaws.com/images/130378927.jpeg",
                        "Description": "As notas cítricas, maçã verde e toques de ervas dominam o paladar, dando um caráter varietal intenso e tensão. Tem excelente persistência, médio corpo e acidez, criando um vinho equilibrado e refrescante.",
                        "Additional_attributes": "Vintage:",
                        "isbn": "7804414004844"
                    }
                }
            }
        };
        
        if(!liquor.data || !liquor.data.getProductByCode || !liquor.data.getProductByCode.data) 
        {
            toast.error("Producto no encontrado");
        }
    
        const liquorDataTranstalted = await translateLiquorData(liquor.data.getProductByCode.data);
        setLiquor(liquorDataTranstalted);
    }

    const createRecipe = async (liquor: string) => {
        const recipe = await createCocktail(liquor);
        setRecipe(recipe);
    }

    return (
      <div className="w-full mt-5 mb-20">
        <div className="flex flex-col items-center gap-6">
          <WebcamCapture handleSendImage={handleSendImage} liquor={liquor} loading={loading} />
          {liquor && (
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">{liquor.Name}</h2>
              {liquor.Name !== "Nombre no encontrado" && (<img src={liquor.Photo_link} alt={liquor.Name} className="w-1/3 mx-auto object-cover rounded-lg mb-4" /> )}
              <h3 className="text-xl font-semibold mb-2">Descripción:</h3>
              <p className="text-gray-700 mb-4">{liquor.Description}</p>
            </div>
          )}
          
          {recipe && (
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">{recipe.cocktailName}</h2>
              <h3 className="text-xl font-semibold mb-2">Ingredientes:</h3>
              <ul className="list-disc list-inside mb-4">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.quantity} of {ingredient.name}
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mb-2">Preparación:</h3>
              <ol className="list-decimal list-inside mb-4">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
              {recipe.observations && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Observaciones:</h3>
                  <p className="text-gray-700">{recipe.observations}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
}