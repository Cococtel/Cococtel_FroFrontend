import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createRecipe, getAllRecipes } from "../../../features/cocktails/services/RecipesService";

export default function CocktailButton( { user, recipe } : { user: string, recipe?: CreateRecipe } ) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [flavor, setFlavor] : any = useState<{}>({ name: "Dulce", value: "sweet" });
    const [ingredients, setIngredients] = useState<any[]>([
        { name: "", quantity: 0, unit: "" }
    ]);
    const [steps, setSteps] = useState<any[]>([
        { description: "" }
    ]);

    const flavorOptions = [
        {
            name: "Dulce",
            value: "sweet",
        },
        {
            name: "Ácido",
            value: "sour",
        },
        {
            name: "Amargo",
            value: "bitter",
        },
        {
            name: "Exótico",
            value: "exotic",
        }
    ]

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setDescription(recipe.description);
            setFlavor(flavorOptions.find((_flavor) => _flavor.value === recipe.category));
            setIngredients(recipe.ingredients.map((ingredient) => {
                const [quantity, unit] = ingredient.quantity.split(" ");
                return {
                    name: ingredient.name,
                    quantity: parseFloat(quantity),
                    unit
                }
            }));
            setSteps(recipe.instructions.map((description) => ({ description })));
        }
    }, [recipe]);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            {
                name: "",
                quantity: 0,
                unit: ""
            }
        ]);
    }

    const handleAddStep = () => {
        setSteps([
            ...steps,
            {
                description: ""
            }
        ]);
    }

    const handleSubmitRecipe = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!name || !description || !flavor || 
            ingredients.some((ingredient) => !ingredient.name || !ingredient.unit) || steps.some((step) => !step.description)
        ) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        const recipe: CreateRecipe = {
            name,
            description,
            category: flavor.value,
            ingredients: ingredients.map((ingredient) => ({
                name: ingredient.name,
                quantity: ingredient.quantity + " " + ingredient.unit
            })),
            instructions: steps.map((step) => step.description),
            creatorId: user
        };

        const response = await createRecipe(recipe);

        if (response.data && response.data.createRecipe) {
            toast.success("Receta creada correctamente");
            setShowForm(false);
            return;
        }
        
        toast.error("Error al crear la receta");
        setShowForm(false);
    };

    const handleDeleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, _index) => _index !== index));
    }

    const handleFlavor = (flavor: any) => {
        setFlavor(flavor);
    }

    return (
        <>
            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black z-40"
                    onClick={handleButtonClick} 
                />
            )}

            <div className="fixed bottom-20 right-5 z-50">
                {!recipe ? 
                    <button
                        onClick={handleButtonClick}
                        className="w-12 h-12 rounded-full bg-[#eb6b50] text-white border-none flex items-center justify-center cursor-pointer text-2xl shadow-lg"
                    >
                        <Plus />
                    </button> :
                    <button
                        className="w-full bg-orange-600 text-white p-3 rounded-full hover:bg-orange-500 transition-colors"
                        onClick={handleButtonClick}
                    >
                        Publicar 
                    </button>
                }
                {showForm && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full fixed bottom-0 left-0 bg-white p-5 shadow-2xl rounded-lg"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Publicar un Cococtel</h3>
                            <button onClick={handleButtonClick} className="text-gray-500">
                                <X />
                            </button>
                        </div>

                        <form className="mt-3 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmitRecipe}>
                            <input
                                type="text"
                                id="postTitle"
                                name="postTitle"
                                placeholder="Nombre del coctel"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="w-full focus:outline-none focus:ring-2 pb-5">
                                <textarea
                                    id="postContent"
                                    name="postContent"
                                    placeholder="Descripción del coctel"
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="flex items-center gap-2">
                                    {
                                        flavorOptions.map((_flavor) => (
                                            <div 
                                                className={`p-2 rounded-md ${flavor.value === _flavor.value ? 'bg-[#eb6b50] text-white' : 'bg-gray-200 text-gray-800'} cursor-pointer transition-colors`} 
                                                key={_flavor.value}
                                                onClick={() => handleFlavor(_flavor)}
                                            >
                                                {_flavor.name}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="my-5 flex flex-col gap-3">
                                    <h3 className="text-md text-black font-bold">Ingredientes</h3>
                                    {
                                        ingredients.map((ingredient, index) => (
                                            <div key={index} className="flex gap-3 items-center">
                                                <input
                                                    type="text"
                                                    name="ingredientName"
                                                    placeholder="Limón"
                                                    className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2"
                                                    value={ingredient.name}
                                                    onChange={
                                                        (e) => setIngredients(
                                                            ingredients.map((_ingredient, _index) => {
                                                                if (_index === index) {
                                                                    return {
                                                                        ..._ingredient,
                                                                        name: e.target.value
                                                                    }
                                                                }
                                                                return _ingredient;
                                                            })
                                                        )
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    name="ingredientQuantity"
                                                    placeholder="Cantidad"
                                                    className="w-1/4 p-3 border rounded-md focus:outline-none focus:ring-2"
                                                    value={ingredient.quantity}
                                                    onChange={
                                                        (e) => setIngredients(
                                                            ingredients.map((_ingredient, _index) => {
                                                                if (_index === index) {
                                                                    return {
                                                                        ..._ingredient,
                                                                        quantity: e.target.value
                                                                    }
                                                                }
                                                                return _ingredient;
                                                            })
                                                        )
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    name="ingredientUnit"
                                                    placeholder="ml"
                                                    className="w-1/4 p-3 border rounded-md focus:outline-none focus:ring-2"
                                                    value={ingredient.unit}
                                                    onChange={
                                                        (e) => setIngredients(
                                                            ingredients.map((_ingredient, _index) => {
                                                                if (_index === index) {
                                                                    return {
                                                                        ..._ingredient,
                                                                        unit: e.target.value
                                                                    }
                                                                }
                                                                return _ingredient;
                                                            })
                                                        )
                                                    }
                                                />
                                                {ingredients.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="text-red-500"
                                                        onClick={() => handleDeleteIngredient(index)}
                                                    >
                                                        <X />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    }
                                    <button 
                                        type="button"
                                        className="w-full text-[#eb6b50] p-3 rounded-md transition-colors mt-3 border border-dashed border-[#eb6b50]"
                                        onClick={handleAddIngredient}
                                    >
                                        Agregar ingrediente
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-md text-black font-bold">Pasos de la preparación</h3>
                                    {
                                        steps.map((step, index) => (
                                            <div key={index} className="flex gap-3 items-center">
                                                <span className="text-[#eb6b50] font-bold">
                                                    {index + 1}
                                                </span>
                                                <input
                                                    type="text"
                                                    name="stepDescription"
                                                    placeholder={"Paso " + (index + 1)}
                                                    className="w-11/12 p-3 border rounded-md focus:outline-none focus:ring-2"
                                                    value={step.description}
                                                    onChange={
                                                        (e) => setSteps(
                                                            steps.map((_step, _index) => {
                                                                if (_index === index) {
                                                                    return {
                                                                        ..._step,
                                                                        description: e.target.value
                                                                    }
                                                                }
                                                                return _step;
                                                            })
                                                        )
                                                    }
                                                />
                                                {steps.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="text-red-500"
                                                        onClick={() => setSteps(steps.filter((_, _index) => _index !== index))}
                                                    >
                                                        <X />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    <button 
                                        type="button"
                                        className="w-full text-[#eb6b50] p-3 rounded-md transition-colors mt-3 border border-dashed border-[#eb6b50]"
                                        onClick={handleAddStep}
                                    >
                                        Agregar paso
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-[#eb6b50] text-white p-3 rounded-md hover:bg-[#d45a42] transition-colors"
                            >
                                Enviar
                            </button>
                        </form>
                    </motion.div>
                )}
            </div>
        </>
    );
}
