import { DynamicIcon } from 'lucide-react/dynamic';


export default function Button({btnLabel, btnIcon, onClick}) {
  return (
    <a onClick={onClick} className="text-sm font-body border-1 px-2 py-0.5 rounded-sm border-grey text-grey hover:bg-grey hover:text-white cursor-pointer">{btnLabel} <DynamicIcon className="inline align-text-bottom ms-1" size={16} name={btnIcon}/></a>
  );
}