import Button from "../components/interactions/button";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile({accountName}) {
  const [success, setSuccess] = React.useState(false);

  function logout() {
    document.cookie = 'user_id=; Max-Age=0; path=/; domain=' + location.hostname;
    setSuccess(true);
  }

  if (accountName === "") {
    const navigate = useNavigate();
    navigate("/login");
  }

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-4xl text-black font-title mb-2">Logged Out Successfully</h2>
        <Link to="/">
          <Button btnLabel="Go Home" />
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <h2 className="text-4xl text-black font-title text-center">Logged in as {accountName}</h2>
        <div className="flex flex-row my-3 place-content-center">
          <Button btnLabel="Logout" onClick={logout} className="mt-4" />
        </div>

      </>
    );
  }
}

export default Profile;