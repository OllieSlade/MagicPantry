import Button from './interactions/button.jsx'

export default function Header({text, btnLabel, btnIcon, onClick}) {
  return (
    <div className="border-b-1 pb-3 flex justify-between place-items-center min-w-75">
        <h2 className="text-4xl text-black font-title">{text}</h2>
        <Button btnLabel={btnLabel} onClick={onClick} btnIcon={btnIcon} />
    </div>
  );
}