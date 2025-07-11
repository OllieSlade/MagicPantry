import Button from "../components/interactions/button";
import { Link } from "react-router-dom";


const NoPage = () => {
  return (
    <>
      <h1 className="text-center text-4xl font-title">Page Not Found!</h1>
      <div className="flex flex-col items-center mt-4">
        <Link to="/">
          <Button btnLabel="Go Home" className="" />
        </Link>
      </div>

    </>
  );
};

export default NoPage;