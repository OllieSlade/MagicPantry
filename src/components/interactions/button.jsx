import { DynamicIcon } from 'lucide-react/dynamic';


export default function Button({btnLabel, btnIcon, onClick, secondary=false}) {
  if (secondary) {
    return (
      <a onClick={onClick} className="text-sm  font-body border-grey text-grey px-2 py-0.5 rounded-sm hover:bg-grey hover:border-1 hover:text-white cursor-pointer hover:opacity-50">{btnLabel} <DynamicIcon className="inline align-text-bottom ms-1" size={16} name={btnIcon}/></a>
    );
  } else {
    return (
      <button type='submit' onClick={onClick} className="text-sm font-body border-1 px-3 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">{btnLabel} <DynamicIcon className="inline align-text-bottom ms-1" size={16} name={btnIcon}/></button>
    );
  }
}