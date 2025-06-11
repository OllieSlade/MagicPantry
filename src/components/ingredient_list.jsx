import Ingredient from './ingredient.jsx'

export default function Ingredients({setIngredient, ingredientsList}) {
  if (ingredientsList.length !== 0) {
    return (
      <div className="py-4 flex flex-col gap-4">
          {ingredientsList.map(ingredient => (
              <Ingredient key={ingredient.id} ingredientsList={ingredientsList} setIngredient={setIngredient} ingredient={ingredient} />
          ))}
      </div>
    );
  } else {
    return;
  }
}