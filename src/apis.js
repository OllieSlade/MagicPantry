import getKey from '../../keys/keys'

function getApiKey() {
  const keys = getKey();
  return keys.spoonacularkey;
}

export async function getRecipiesST(ingredients) {
  const url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients.join(",") + "&number=100&ranking=2&apiKey=" + getApiKey();
  try {
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
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchRecipeST(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${getApiKey()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
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
  } catch (error) {
    console.error(error.message);
  }
}