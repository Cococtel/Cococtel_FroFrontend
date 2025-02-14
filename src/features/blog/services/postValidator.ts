export const postValidator = (title: string, content: string, image: string | null) => 
{
    if (!title.trim() || !content.trim()) 
    {
        return "Completa todos los campos antes de subir la publicación.";
    }

    if (!image) 
    {
        return "Por favor, sube una imagen.";
    }

    return "";
}