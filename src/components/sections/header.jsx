import { UserRoundPen } from 'lucide-react';
import { House } from 'lucide-react';
import { Link } from "react-router-dom";


export default function Header({accountName}) {

  function checkCookie() {
    const check = document.cookie.match(/^(.*;)?\s*user_id\s*=\s*[^;]+(.*)?$/)
    if (check) {
      return "/profile";
    } else {
      return "/login";
    }
  }

  return (
    
    <header className="bg-gray-800">
      <div className="px-8 py-3 flex justify-between items-center">
        <Link to="/"><h1 className="text-5xl text-white font-title">MagicPantry</h1></Link>
        <div className="flex items-center gap-4">
          <Link to="/"><House className="text-white" size={32} /></Link>
          <Link to={checkCookie()}>
            <UserRoundPen className="text-white inline" size={32} />
            {accountName ? <p className="text-white font-bold inline ps-2">{accountName}</p> : null}
          </Link>
          
        </div>
      </div>
    </header>
  );
}