import { useState } from 'react'
import Header from './components/sections/header'
import Sidebar from './components/sections/sidebar'
import Results from './components/sections/results'

function processData(ingredientsList) {
  return ingredientsList.filter(ingredient => ingredient.include).map(ingredient => ingredient.ingredient);
}

async function generate_recipe(ingredients) {
  return fetch(`https://magicpantry.netlify.app/.netlify/functions/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients })
  })
}

function App() {
  const [ingredientsList, setIngredient] = useState([]);
  const [AIrecipe, setAIRecipe] = useState("");
  const [APIrecipe, setAPIRecipe] = useState([]);

  function refresh() {
    const generator = generate_recipe(processData(ingredientsList));
    generator.then((result) => {
      setAIRecipe(result);
    })
    // getRecipiesST(processData(ingredientsList)).then((result) => {
    //   setAPIRecipe(result);
    //   console.log("API Recipes:", result);
    // }).catch((error) => {
    //   console.error("Error fetching recipes:", error);
    // });
 
  }

  return (
    <>
      <Header />
      <section className="flex">
        <Sidebar ingredientsList={ingredientsList} setIngredient={setIngredient} />
        <Results refresh={refresh} AIrecipe={AIrecipe} APIrecipe={APIrecipe}/>
      </section>
    </>
  )
}

export default App

