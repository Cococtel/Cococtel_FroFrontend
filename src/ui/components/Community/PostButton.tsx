import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import TiptapEditor from "./TipTapEditor";
import { toast } from "sonner";
import { postValidator } from "../../../features/blog/services/postValidator";
import { savePost } from "../../../features/blog/services/postService";

export default function FloatingForm( { token, user } : { token: string, user: string } ) {
    const [showForm, setShowForm] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const title = (event.target as HTMLFormElement).postTitle.value.trim();
        const content = document.querySelector('.ProseMirror')?.innerHTML.trim() || "";
        const image = imagePreview;

        const errorMessage = postValidator(title, content, image);

        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        const post: SavePost = {
            title,
            content,
            urlImage: image || "",
        };

        savePost(post, token);

        toast.success("Post creado correctamente");
        setShowForm(false);
    };

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
                <button
                    onClick={handleButtonClick}
                    className="w-12 h-12 rounded-full bg-[#eb6b50] text-white border-none flex items-center justify-center cursor-pointer text-2xl shadow-lg"
                >
                    <Plus />
                </button>

                {showForm && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full fixed bottom-0 left-0 bg-white p-5 shadow-2xl rounded-lg"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Crear una publicación</h3>
                            <button onClick={handleButtonClick} className="text-gray-500">
                                <X />
                            </button>
                        </div>

                        <form className="mt-3 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmitPost}>
                            <input
                                type="text"
                                id="postTitle"
                                name="postTitle"
                                placeholder="Título del Post"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
                            />
                            <div className="w-full focus:outline-none focus:ring-2 focus:ring-[#eb6b50] pb-5">
                                <label
                                    htmlFor="postImage"
                                    className="block text-md font-medium text-gray-700 mb-5"
                                >
                                    Subir Imagen
                                </label>
                                <input
                                    type="file"
                                    id="postImage"
                                    name="postImage"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#eb6b50] file:text-white hover:file:bg-[#d45a42]"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-3 w-full h-auto rounded-md" />
                                )}
                            </div>
                            <TiptapEditor />
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
