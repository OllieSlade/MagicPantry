import Button from "./interactions/button";
import {fetchRecipeST} from "../apis";

export default function Recipe({recipe}) {
    async function openRecipe() {
        fetchRecipeST(recipe.id).then((result) => {
            open(result.sourceUrl, "_blank");
        }).catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    }

    return (
      <div className="flex place-items-center w-full gap-3">
        <img src={recipe.image} class="w-40 h-auto object-cover rounded-sm"/>
        <div>
            <h2 className="text-xl font-bold text-black font-body">{recipe.title} <span class="text-sm font-normal">[{recipe.likes} Likes]</span></h2>
            <p>From your Pantry: {recipe.usedIngredients && recipe.usedIngredients.join(", ")}</p>
            <p>Extra Ingredients: {recipe.missedIngredients && recipe.missedIngredients.join(", ")}</p>
            <Button btnLabel="View Recipe" onClick={openRecipe}/>
        </div>
      </div>
    );
}