import Title from '../title_with_button';
import Search from '../interactions/search_bar';
import Ingredients from '../ingredient_list';

export default function Sidebar({setIngredient, ingredientsList}) {
  function clearIngredients() {
    setIngredient([]);
  }
  return (
    <section className="bg-pink min-h-[calc(100vh-72px)] w-96">
        <div className="py-5 px-8">
            <Title text="My Pantry" btnLabel='Clear Pantry' onClick={clearIngredients} />
            <Search setIngredient={setIngredient} ingredientsList={ingredientsList} exampleText="Add Ingredient"/>
            <Ingredients setIngredient={setIngredient} ingredientsList={ingredientsList} />
        </div>

    </section>
  );
}