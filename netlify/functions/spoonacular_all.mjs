export default async (req, context) => {
    const body = await req.json();
    let ingredients = body.ingredients;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return new Response("Invalid or missing ingredients", { status: 400 });
    }
    
    try {
        const recipe = await getRecipies(ingredients);
        return new Response(JSON.stringify(recipe));
    } catch (error) {
        console.error("Error generating recipe:", error);
        return new Response(String(error), { status: 500 });
    }
};

async function getRecipies(ingredients) {
  const apiKey = Netlify.env.get("SPOONACULAR_KEY");
  const url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients.join(",") + "&number=100&ranking=2&apiKey=" + apiKey;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  const cleanResults = json.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    usedIngredients: recipe.usedIngredients.map(ing => ing.name),
    missedIngredients: recipe.missedIngredients.map(ing => ing.name),
    likes: recipe.likes
  }));
  return cleanResults;
}