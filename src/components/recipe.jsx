import Button from "./interactions/button";

export default function Recipe({recipe}) {
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