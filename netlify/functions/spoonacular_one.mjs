export default async (req, context) => {
    const body = await req.json();
    let recipeID = body.id;

    if (!recipeID) {
        return new Response("Invalid or missing recipe ID", { status: 400 });
    }
    
    try {
        const recipe = await fetch_one_recipe(recipeID);
        return new Response(JSON.stringify(recipe));
    } catch (error) {
        console.error("Error generating recipe:", error);
        return new Response(String(error), { status: 500 });
    }
};

async function fetch_one_recipe(recipeID) {
  const apiKey = Netlify.env.get("SPOONACULAR_KEY");
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  } else {
    console.log("Recipe fetched successfully:", recipeID);
  }

  const json = await response.json();
  const cleanResults = {
    id: json.id,
    title: json.title,
    image: json.image,
    ingredients: json.extendedIngredients.map(ing => ing.original),
    instructions: json.instructions,
    sourceUrl: json.sourceUrl,
    readyInMinutes: json.readyInMinutes,
    servings: json.servings,
  };
  return cleanResults;
}