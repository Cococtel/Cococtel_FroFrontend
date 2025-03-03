import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getAllRecipes, isLikedByUser, toggleLike } from '../../../features/cocktails/services/RecipesService';

interface LikeProps {
    item: EditRecipe;
}

const Like: React.FC<LikeProps> = ({ item }) => {

    const [like, setLike] = React.useState(false);

    useEffect(() => {
        checkRecipeLike();
    }, []);

    const checkRecipeLike = async () => {
        const liked = await isLikedByUser(item.id);
        setLike(liked);
    };

    const handleLike = async() => {
        const like = await toggleLike(item.id);
        setLike(like);
    };

    return (
        <div 
            onClick={handleLike}
            className="flex items-center gap-2 p-2 rounded-2xl border border-[#eb6b50]">
            <Heart 
                size={24} 
                color="#eb6b50" 
                fill={like ? '#eb6b50' : 'none'}
            />
            {/* <span>{item.likes}</span> */}
        </div>
    );
};

export default Like;