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
            <div class="flex gap-3 py-2">
              <Button onClick={updateResultView(0)} btnLabel="Spoonacular"/>
              <Button onClick={updateResultView(1)} btnLabel="TheMealDB"/>
              <Button onClick={updateResultView(2)} btnLabel="Gemini AI"/>
            </div>

            {viewResult == 0 ? <div class="flex flex-col gap-3 mt-4">
              {APIrecipe.map(recipe => (
                <Fragment key={recipe.id}>
                  <Recipe recipe={recipe} />
                  <hr class="border-gray-400"/>
                </Fragment>

              ))}
            </div>: null}


            {viewResult == 1 ? <div class="flex flex-col gap-3 mt-4">
              <p>Coming soon</p>

            </div>: null}

            {viewResult == 2 ? <div className="text-lg mt-4">
              <ReactMarkdown>{AIrecipe}</ReactMarkdown>

            </div>: null}

        </div>
        
    </section>
  );
}