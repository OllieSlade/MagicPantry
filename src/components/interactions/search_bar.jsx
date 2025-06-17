import { ArrowRight } from 'lucide-react';

export default function Search_bar({exampleText="Search", onClick}) {

      
  return (
    <form action={onClick} className="flex place-items-center">
      <input name="inputBox" placeholder={exampleText} type="text" className="w-full bg-light-pink border-black border-e-0 rounded-e-none border-1 rounded-sm font-body p-2 "></input>
      <button type="submit" className="bg-light-pink border-black border-s-0 rounded-s-none border-1 rounded-sm p-2"><ArrowRight onClick={onClick} className='cursor-pointer ' /></button>
    </form>
  );
}