// src/ui/components/Cocktails/CocktailSearch.jsx
import React, { useState } from 'react';
import LatestPosts from './LatestPosts';

function CocktailSearch({ recipes } : any) {
  const [search, setSearch] = useState('');

  // Filter recipes by name (case-insensitive)
  const filteredRecipes = recipes.filter((recipe:any) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search cocktails by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <LatestPosts recipes={filteredRecipes} />
    </div>
  );
}

export default CocktailSearch;
