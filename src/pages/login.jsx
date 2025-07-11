import Button from "../components/interactions/button";
import { Link } from "react-router-dom";
import React from "react";

function Login({initialise}) {
  const [showError, setShowError] = React.useState([false, ""]);
  const [success, setSuccess] = React.useState(false);

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function login(formData) {
    const value = formData.get('inputBox');
    fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: value, action: "getUser" })  
    })
    .then(response => {
      if (response.status === 404) {
          setShowError([true, "That Username does not exist."]);
      } else if (response.status === 200) {
          setSuccess(true);
          return response.json().then(data => {
            setCookie("user_id", data.user_id, 90);
            initialise();
          });
      } else {
          setShowError([true, "An error occurred while logging in. Please try again later."]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-4xl text-black font-title">Login Successful!</h2>
        <p className="text-sm text-grey py-2">You can now access your pantry and saved recipes.</p>
        <Link to="/">
          <Button btnLabel="Go Home" />
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <p className={`text-xl text-pastel-red text-center font-bold border-2 border-pastel-red p-2 absolute -translate-y-16 ${showError[0] ? '' : 'hidden'}`}>Error: {showError[1]}</p>
        <div className="border-b-1 pb-3 text-center w-full">
            <h2 className="text-4xl text-black font-title">Login</h2>
        </div>

        <form action={login} className="my-3">
            <p className="text-sm font-body">Username</p>
            <input name="inputBox" minLength="8" maxLength="32" required placeholder="JohnDoe89" type="text" className="w-full block bg-light-pink border-black border-1 rounded-sm font-body p-2 "></input>
            <div className="flex flex-row gap-3 place-content-center mt-3">
                <Button btnLabel="Login" />
                <Link to="/create-account">
                <Button btnLabel="Sign Up" secondary={true} />
                </Link>
            </div>
        </form>
      </>
    );
  }
}

export default Login;