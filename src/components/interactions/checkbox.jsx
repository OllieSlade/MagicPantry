export default function Checkbox({label, ingredientsList, ingredient, setIngredient}) {
  function ingredientToggle() {
    setIngredient(
      ingredientsList.map(a => {
        if (a.id === ingredient.id) {
          return { ...a, include: !a.include };
        }
        return a;
      })
    );  
  }

  return (

    <label className="font-body text-grey"> {label}
        <input defaultChecked={ingredient.include} onChange={ingredientToggle} id="checkbox" type="checkbox" className="ms-2" />
    </label>
  );
}