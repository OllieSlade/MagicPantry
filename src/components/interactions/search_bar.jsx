import { Search } from 'lucide-react';

export default function Search_bar({exampleText="Search", setIngredient, ingredientsList}) {
  function addIngredient(formData) {
    const value = formData.get('ingredient');
    if (value === '' || ingredientsList.some(ingredient => ingredient.ingredient.toLowerCase() === value.toLowerCase())) {
      return;
    }
    setIngredient(prev => [
      ...prev,
      { id: Math.floor(10000 + Math.random() * 90000), ingredient: value, include: true, quantity: 1 }
    ]);
  }
      
  return (
    <form action={addIngredient} className="flex place-items-center mt-5">
      <input name="ingredient" placeholder={exampleText} type="text" className="w-full bg-light-pink border-grey border-e-0 rounded-e-none border-1 rounded-sm font-body p-2 text-lg "></input>
      <button type="submit" className="bg-light-pink border-grey border-s-0 rounded-s-none border-1 rounded-sm p-2.5"><Search onClick={addIngredient} className='cursor-pointer ' /></button>
    </form>
  );
}