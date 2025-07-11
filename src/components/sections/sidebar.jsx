import Title from '../title_with_button';
import Search from '../interactions/search_bar';
import Ingredients from '../ingredient_list';

export default function Sidebar({setIngredient, ingredientsList}) {
  async function clearIngredients() {
    fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "clearPantry" })
    })
    .then(response => {
      if (response.status === 200 || response.status === 401) {
          return response.json();
      } else {
          alert("An error occurred whilst clearing the pantry. Please try again later.");
      }
    });
    setIngredient([]);
  }

  async function addIngredient(formData) {
    const value = formData.get('inputBox');
    if (value === '' || ingredientsList.some(ingredient => ingredient.ingredient.toLowerCase() === value.toLowerCase())) {
      return;
    }

    fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredient: { name: value, quantity: 1, include: true }, action: "addIngredient" })
    })
    .then(response => {
      if (response.status === 201 || response.status === 401) {
          return response.json();
      } else {
          alert("An error occurred while adding the ingredient. Please try again later.");
      }
    }).then(data => {
      if (data) {
        setIngredient(prev => [
          ...prev,
          { id: data.id, ingredient: value, include: true, quantity: 1 }
        ]);
      }
    })
  }

  return (
    <section className="bg-pink min-h-[calc(100vh-72px)] w-full md:w-96">
        <div className="py-5 px-8">
            <Title text="My Pantry" btnLabel='Clear Pantry' onClick={clearIngredients} />
            <div className="pt-2">
              <Search onClick={addIngredient} exampleText="Add Ingredient"/>
              <Ingredients setIngredient={setIngredient} ingredientsList={ingredientsList} />
            </div>
        </div>

    </section>
  );
}