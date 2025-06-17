export default function Checkbox({label, ingredientsList, ingredient, setIngredient}) {
  function ingredientToggle() {
    fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredient_id: ingredient.id, action: "toggleInclude" })
    })
    .then(response => {
      if (response.status === 200 || response.status === 401) {
          return response.json();
      } else {
          alert("An error occurred while removing the ingredient. Please try again later.");
      }
    })

    setIngredient(
      ingredientsList.map(a => {
        if (a.id === ingredient.id) {
          return { ...a, include: !a.include };
        }
        return a;
      })
    );  
    console.log(ingredientsList);
  }

  return (

    <label className="font-body text-grey"> {label}
        <input defaultChecked={ingredient.include} onChange={ingredientToggle} id="checkbox" type="checkbox" className="ms-2" />
    </label>
  );
}