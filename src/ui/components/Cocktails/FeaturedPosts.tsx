import React, { useEffect } from "react";
import { getAllRecipes } from "../../../features/cocktails/services/RecipesService";

const FeaturedPosts: React.FC = () => {

    const [recipes, setRecipes] = React.useState([] as Recipe[]);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        const response = await getAllRecipes();
        
        if(response.data && response.data.recipes && response.data.recipes.data.length > 0) {
            setRecipes(response.data.recipes.data);
        }
    }

    const images = [
      "https://images.unsplash.com/photo-1587282864230-5c518e5fd250?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1619296731021-b043c53462d3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvY3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1566823422707-7813dab8eca9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNvY3RlbHxlbnwwfHwwfHx8MA%3D%3D"  
    ]
  
    return (
        <div className="w-full overflow-hidden my-10">
            <div className="carousel flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide w-full">
                {recipes.slice(0, 4).map((post:any, index:number) => (
                    <a
                    href={`/cocktails/${post._id}`}
                    className="w-[calc(100%-40px)] aspect-square bg-gray-300 flex-shrink-0 rounded-xl relative"
                    style={{
                        backgroundImage: `url(${images[index]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-xl"></div>
                    <div className="absolute bottom-0 p-4 text-white">
                        <h2 className="text-xl font-bold">{post.name}</h2>
                        <p className="text-sm break-words whitespace-normal mb-2">
                            {post.description.replace(/<\/?[^>]+(>|$)/g, "").split(" ").slice(0,12).join(" ") + "..."}
                        </p>
                        <p className="text-xs">
                            Por <strong>{post.author}</strong> on <strong>{new Date(post.createdAt).toLocaleDateString()}</strong>
                        </p>
                    </div>
                    <button className="absolute bottom-2 right-2 text-white p-2 rounded-full shadow-md">
                        
                    </button>
                    </a>
                ))}
            </div>
      </div>
    );
  };
  
  export default FeaturedPosts;