import Checkbox from './interactions/checkbox.jsx';
import { Trash2 } from 'lucide-react';

export default function Ingredient(props) {
      function removeIngredient() {
        props.setIngredient(
          props.ingredientsList.filter(a => a.id !== props.ingredient.id)
        );
      }

    return (
      <div className="flex justify-between place-items-center w-full">
          <h2 className="text-2xl text-black font-body">{props.ingredient.ingredient}</h2>
          <div className="flex place-items-center">
              <Checkbox label="Include" {... props} />
              <a onClick={removeIngredient} className="text-pastel-red ps-3 cursor-pointer"><Trash2 className='inline align-text-bottom'/></a>
          </div>
      </div>
    );
}