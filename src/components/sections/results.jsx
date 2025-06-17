import Title from '../title_with_button'
import Recipe from '../recipe'
import ReactMarkdown from 'react-markdown'
import Button from '../interactions/button'
import { Fragment } from 'react';
import { useState } from 'react'

export default function Results({AIrecipe, APIrecipe, refresh}) {
  const [viewResult, setResultView] = useState(0);

  function updateResultView(view) {
    return () => {
      setResultView(view);
    }
  }

  return (
    <section>
      
        <div className='p-5 overflow-auto'>
            <Title text="Recipes" btnLabel="Get Results" onClick={refresh} btnIcon="refresh-ccw" />
            <div className="flex gap-3 py-2">
              <input type="radio" name="view" id="spoonacular" className="radioState hidden" onClick={updateResultView(0)} defaultChecked/>
              <label htmlFor="spoonacular" className="radioStyle text-sm font-body border-1 px-2 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">Spoonacular</label>
              <input type="radio" name="view" id="themealdb" className="radioState hidden" onClick={updateResultView(1)} />
              <label htmlFor="themealdb" className="radioStyle text-sm font-body border-1 px-2 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">TheMealDB</label>
              <input type="radio" name="view" id="gemini" className="radioState hidden" onClick={updateResultView(2)} />
              <label htmlFor="gemini" className="radioStyle text-sm font-body border-1 px-2 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">Gemini AI</label>
            </div>

            {viewResult == 0 ? <div className="flex flex-col gap-3 mt-4">
              {APIrecipe.map(recipe => (
                <Fragment key={recipe.id}>
                  <Recipe recipe={recipe} />
                  <hr className="border-gray-400"/>
                </Fragment>

              ))}
            </div>: null}


            {viewResult == 1 ? <div className="flex flex-col gap-3 mt-4">
              <p>Coming soon</p>

            </div>: null}

            {viewResult == 2 ? <div className="text-lg mt-4">
              <ReactMarkdown>{AIrecipe}</ReactMarkdown>

            </div>: null}

        </div>
        
    </section>
  );
}