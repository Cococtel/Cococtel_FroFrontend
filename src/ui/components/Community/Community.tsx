import { useState } from "react";
import { Camera, Upload, Send } from "lucide-react";
import Card from "./Card";
import CardContent from "./CardContent";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  image: string;
  likes: number;
  comments: number;
}

export default function CommunitySection() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Mojito Tropical",
      content: "Refrescante mojito con un toque de mango y maracuyá.",
      author: "Carlos M.",
      createdAt: new Date(),
      image: "https://source.unsplash.com/300x200/?mojito",
      likes: 24,
      comments: 3,
    },
    {
      id: 2,
      title: "Sunset Margarita",
      content: "Una margarita con notas cítricas y un hermoso degradado de colores.",
      author: "Ana R.",
      createdAt: new Date(),
      image: "https://source.unsplash.com/300x200/?margarita",
      likes: 18,
      comments: 5,
    },
  ]);

  const [newPost, setNewPost] = useState<{ title: string; content: string; image: string | null }>({
    title: "",
    content: "",
    image: null,
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPost((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handlePublish = () => {
    if (newPost.title && newPost.content && newPost.image) {
      setPosts([{ id: Date.now(), title: newPost.title, content: newPost.content, author: "Tú", createdAt: new Date(), image: newPost.image, likes: 0, comments: 0 }, ...posts]);
      setNewPost({ title: "", content: "", image: null });
    }
  };

  return (
    <div className="w-full min-h-screen p-4 mt-5 md:p-10 mb-20">
      <div className="w-full text-center">
        <h1 className="font-bold mb-4 text-orange-600 text-3xl">Comunidad de Cocteles</h1>
        <p className="mb-6 text-gray-600">Explora, comparte y disfruta las creaciones de la comunidad.</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mx-auto mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Publica tu Creación</h2>
        <input
          type="text"
          placeholder="Nombre del Coctel"
          className="w-full p-2 border rounded mb-4"
          value={newPost.title}
          onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Descripción del coctel"
          className="w-full p-2 border rounded mb-4"
          value={newPost.content}
          onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
        ></textarea>
        {newPost.image && <img src={newPost.image} alt="Preview" className="w-full h-40 object-cover rounded mb-4" />}
        <label className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-gray-200 transition-colors cursor-pointer">
          <Upload size={20} /> Subir Imagen
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
        <button
          onClick={handlePublish}
          className="w-full mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-orange-600 transition-colors"
        >
          <Send size={20} /> Publicar
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="shadow-md rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold text-orange-600">{post.title}</h3>
              <p className="text-gray-700 mb-2">{post.content}</p>
              <div className="flex justify-between text-gray-500 text-sm">
                <p>{post.likes} Me gusta</p>
                <p>{post.comments} Comentarios</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
