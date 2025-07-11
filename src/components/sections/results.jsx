import Title from '../title_with_button'
import Recipe from '../recipe'
import ReactMarkdown from 'react-markdown'
import { Fragment } from 'react';
import { useState } from 'react'

export default function Results({AIrecipe, APIrecipe, refresh, accountName, bookmarks}) {
  const [viewResult, setResultView] = useState(0);

  function updateResultView(view) {
    return () => {
      setResultView(view);
    }
  }

  return (
    <section className="w-full hidden md:block ">
      
        <div className='p-5 overflow-auto w-full'>
            <Title text="Recipes" btnLabel="Get Results" onClick={refresh} btnIcon="refresh-ccw" />
            <div className="flex gap-3 py-2">
              <input type="radio" name="view" id="spoonacular" className="radioState hidden" onClick={updateResultView(0)} defaultChecked/>
              <label htmlFor="spoonacular" className="radioStyle text-sm font-body border-1 px-3 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">Spoonacular</label>
              <input type="radio" name="view" id="gemini" className="radioState hidden" onClick={updateResultView(2)} />
              <label htmlFor="gemini" className="radioStyle text-sm font-body border-1 px-3 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">Gemini AI</label>
              <input type="radio" name="view" id="favourites" className="radioState hidden" onClick={updateResultView(1)} />
              {accountName ? <label htmlFor="favourites" className="radioStyle text-sm font-body border-1 px-3 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">Favourites</label> : null}
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
              {bookmarks.map(recipe => (
                <Fragment key={recipe.id}>
                  <Recipe recipe={recipe} />
                  <hr className="border-gray-400"/>
                </Fragment>

              ))}
            </div>: null}

            {viewResult == 2 ? <div className="text-lg mt-4">
              <ReactMarkdown>{AIrecipe}</ReactMarkdown>

            </div>: null}

        </div>
        
    </section>
  );
}