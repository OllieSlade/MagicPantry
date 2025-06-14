import { GoogleGenAI } from "@google/genai";


export default async (req, context) => {
    console.log("Received request:", req.body, "Type:", typeof req.body);

    let ingredients;
    if (typeof req.body === "string") {
        try {
            const parsed = JSON.parse(req.body);
            ingredients = parsed.ingredients;
        } catch (err) {
            console.error("Failed to parse JSON body:", err);
            return new Response("Invalid JSON body", { status: 400 });
        }
    } else if (typeof req.body === "object" && req.body !== null) {
        ingredients = req.body.ingredients;
    } else {
        return new Response("Invalid request body", { status:400 });
    }

    console.log("Ingredients:", ingredients);

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return new Response("Invalid or missing ingredients", { status: 400 });
    }
    
    try {
        const recipe = await generate_recipe(ingredients);
        return new Response(JSON.stringify(recipe));
    } catch (error) {
        console.error("Error generating recipe:", error);
        return new Response(String(error), { status: 500 });
    }
};

async function generate_recipe(ingredients) {
  const apiKey = Netlify.env.get("GEMINI_KEY");
  const ai = new GoogleGenAI({apiKey:apiKey});
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "format the following response in format and keep excess text to a minimum, just returning the accurate ingredients and step by step guide. Fetch a few recipes that include some or all of these ingredients; " + ingredients.join(", "),
  });
  console.log("AI Response:", response.text);
  return response.text;
}