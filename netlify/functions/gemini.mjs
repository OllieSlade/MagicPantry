import { GoogleGenAI } from "@google/genai";


export default async (req, context) => {
    const body = await req.json();
    let ingredients = body.ingredients;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid or missing ingredients" }), { status: 400 });
    }
    
    try {
        const recipe = await generate_recipe(ingredients);
        return new Response(recipe);
    } catch (error) {
        console.error("Error generating recipe:", error);
        return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
};

async function generate_recipe(ingredients) {
  const apiKey = Netlify.env.get("GEMINI_KEY");
  const ai = new GoogleGenAI({apiKey:apiKey});
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "format this response in markdown and keep additional text to a minimum, as part of this do not repeat any part of this command in you response, just return the accurate ingredients and step by step guide. Fetch a few recipes that include some or all of the following ingredients; " + ingredients.join(", "),
  });
  return response.text;
}