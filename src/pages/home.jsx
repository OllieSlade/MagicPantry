import { useState } from 'react'
import Sidebar from '../components/sections/sidebar.jsx'
import Results from '../components/sections/results'
import { useEffect } from 'react';


function processData(ingredientsList) {
  return ingredientsList.filter(ingredient => ingredient.include).map(ingredient => ingredient.ingredient);
}

function generate_recipe(ingredients) {
  return fetch(`${window.location.origin}/.netlify/functions/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients })
  })
    .then(response => response.text())
    .catch(error => {
      console.error("Error generating recipe:", error);
      return "Error generating recipe. Please try again.";
    });
}

function fetch_recipes(ingredients) {
  console.log("Fetching recipes with ingredients:", ingredients);
  return fetch(`${window.location.origin}/.netlify/functions/spoonacular_all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients })
  })
    .then(response => response.json())
    .catch(error => {
      console.error("Error fetching recipes:", error);
      return "Error fetching recipes. Please try again.";
    });
}

function Home({ ingredientsList, setIngredient }) {
  const [AIrecipe, setAIRecipe] = useState("");
  const [APIrecipe, setAPIRecipe] = useState([]);

  function refresh() {
    const ingredients = processData(ingredientsList);
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient to generate recipes.");
      return;
    }
    setAIRecipe("Loading AI Result");
    generate_recipe(ingredients).then((result) => {
      console.log("Generated Recipe:", result);
      setAIRecipe(result);
    });

    fetch_recipes(ingredients).then((result) => {
      setAPIRecipe(result);
      console.log("API Recipes:", result);
    }).catch((error) => {
      console.error("Error fetching recipes:", error);
    });
 
  }

  return (
      <section className="flex">
        <Sidebar ingredientsList={ingredientsList} setIngredient={setIngredient} />
        <Results refresh={refresh} AIrecipe={AIrecipe} APIrecipe={APIrecipe}/>
      </section>
  )
}

export default Home

