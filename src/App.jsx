import { useState } from 'react'
import Header from './components/sections/header'
import Sidebar from './components/sections/sidebar'
import Results from './components/sections/results'
import { GoogleGenAI } from "@google/genai";
import {getRecipiesST} from './apis'
import getKey from '../../keys/keys'

const apiKey = getKey().geminikey;
const ai = new GoogleGenAI({apiKey});

async function generate_recipe(ingredients) {
  console.log("Generating recipe with ingredients:", ingredients);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "format the following response in format and keep excess text to a minimum, just returning the accurate ingredients and step by step guide. Fetch a few recipes that include some or all of these ingredients; " + ingredients.join(", "),
  });
  console.log("AI Response:", response.text);
  return response.text;
}

function processData(ingredientsList) {
  return ingredientsList.filter(ingredient => ingredient.include).map(ingredient => ingredient.ingredient);
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
    getRecipiesST(processData(ingredientsList)).then((result) => {
      setAPIRecipe(result);
      console.log("API Recipes:", result);
    }).catch((error) => {
      console.error("Error fetching recipes:", error);
    });
 
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

