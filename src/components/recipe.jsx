import Button from "./interactions/button";
import { BookmarkPlus } from 'lucide-react';
import { useState } from "react";


export default function Recipe({recipe}) {
    const [bookmarked, setBookmarked] = useState(false);

    function openRecipe() {
      fetch(`${window.location.origin}/.netlify/functions/spoonacular_one`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: recipe.id})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        window.open(data.sourceUrl, "_blank");
      })
      .catch((error) => {
        console.error("Error opening recipe:", error);
      });

    }

    function addBookmark() {
      fetch(`${window.location.origin}/.netlify/functions/database`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "addBookmark", recipe_id: recipe.id })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Bookmark added:", data);
      })
      .catch((error) => {
        console.error("Error adding bookmark:", error);
      });
    }


    return (
      <div className="flex place-items-center w-full">
        <div className="flex place-items-center w-full gap-3">
          <img src={recipe.image} className="w-40 h-auto object-cover rounded-sm"/>
          <div>
              <h2 className="text-xl font-bold text-black">{recipe.title} <span className="text-sm font-normal">[{recipe.likes} Likes]</span></h2>
              <p>From your Pantry: {recipe.usedIngredients && recipe.usedIngredients.join(", ")}</p>
              <p class="mb-1">Extra Ingredients: {recipe.missedIngredients && recipe.missedIngredients.join(", ")}</p>
              <Button btnLabel="View Recipe" onClick={openRecipe}/>
          </div>
        </div>
        <div>
          <a onClick={addBookmark}><BookmarkPlus size={32}/></a>
        </div>
      </div>

    );
}