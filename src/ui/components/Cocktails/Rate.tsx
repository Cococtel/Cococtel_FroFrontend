import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { likeRecipe, updateRecipeRating } from '../../../features/cocktails/services/RecipesService';

interface RateProps {
    id: string;
    user_id: string;
}

const Rate: React.FC<RateProps> = ({ id, user_id }) => {
    const [rating, setRating] = useState<number>(0);

    const handleClick = (index: number) => {
        setRating(index);
        localStorage.setItem(`rating-${id}-${user_id}`, index.toString());
    };

    useEffect(() => {
        const savedRating = localStorage.getItem(`rating-${id}-${user_id}`);
        if (savedRating) {
            setRating(parseInt(savedRating, 10));
        }
    }, []);

    useEffect(() => {
        updateRating();
    }, [rating]);

    const updateRating = async() => {
        const response = await updateRecipeRating(id, rating, user_id);
        console.log(response);
        if(response.data && response.data.updateRecipe) {
            console.log('Rating updated');
        }
    };

    return (
        <div className='flex gap-1 justify-center my-2'>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                >
                    <Star 
                        size={24} 
                        fill={star <= rating ? '#eb6b50' : 'none'}
                    />
                </span>
            ))}
        </div>
    );
};

export default Rate;