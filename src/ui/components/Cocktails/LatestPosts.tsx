import React, { useEffect } from 'react';
import sweet from "../../../assets/img/sweet.webp";
import exotic from "../../../assets/img/exotic.webp";
import bitter from "../../../assets/img/bitter.webp";
import sour from "../../../assets/img/sour.webp";

interface LatestPostsProps {
  recipes: Recipe[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ recipes }) => {

  const images:any = {
    "sweet": sweet,
    "exotic": exotic,
    "bitter": bitter,
    "sour": sour
  }

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <div className="flex flex-col gap-2 mb-20">
      {recipes.map((post, index) => (
        <a
          key={index}
          href={`/cocktails/${post._id}`} 
          className="w-full flex items-center gap-5 p-5 shadow-lg border border-gray-200 rounded-xl"
        >
          <div
            className="w-28 aspect-square bg-gray-300 flex-shrink-0 rounded-xl relative"
            style={{
              backgroundImage: `url(${images[post.category].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
          <div>
            <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('en-GB')}
            </p>
            <h2 className="text-lg font-bold">{post.name}</h2>
            <p className="text-sm text-gray-500">
              {post.description.length > 100 ? `${post.description.substring(0, 120)}...` : post.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default LatestPosts;