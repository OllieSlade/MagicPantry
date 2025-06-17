import Input from "../components/interactions/search_bar";
import Button from "../components/interactions/button";
import { Link } from "react-router-dom";
import React from "react";


function CreateAccount() {
    const [showError, setShowError] = React.useState([false, ""]);
    const [success, setSuccess] = React.useState(false);

    function createAccount(formData) {
      const value = formData.get('inputBox');
      fetch(`${window.location.origin}/.netlify/functions/database`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: value, action: "create" })  
      })
      .then(response => {
        if (response.status === 409) {
            setShowError([true, "That Username has already been taken."]);
        } else if (response.status === 201) {
            setSuccess(true);
        } else {
            setShowError([true, "An error occurred while creating your account. Please try again later."]);
        }
      })
    }
    
    if (success) {
        return (
            <div className="text-center">
                <h2 className="text-4xl text-black font-title ">Account Created!</h2>
                <p className="text-sm text-grey py-2">You can now log in with your new account.</p>
                <Link to="/login">
                    <Button btnLabel="Login" />
                </Link>
            </div>
        );
    } else {
        return (
            <>
            <p className={`text-xl text-pastel-red text-center font-bold border-2 border-pastel-red p-2 absolute -translate-y-16 ${showError[0] ? '' : 'hidden'}`}>Error: {showError[1]}</p>
            <div className="border-b-1 pb-3 text-center w-full">
                <h2 className="text-4xl text-black font-title">Sign up to Magic Pantry</h2>
            </div>
            <p className="text-sm text-grey pt-2">Be warned, your account data is only secured with a username. This should be fine as we don’t allow you to associate any data with your account other than what’s in your pantry and saved recipes. But keep this in mind.</p>
            <form action={createAccount} className="my-3">
                <p className="text-sm font-body">Username</p>
                <input name="inputBox" minLength="8" maxLength="32" required placeholder="JohnDoe89" type="text" className="w-full block bg-light-pink border-black border-1 rounded-sm font-body p-2 "></input>
                <div className="flex flex-row gap-3 place-content-center mt-3">
                    <Button btnLabel="Sign Up" />
                    <Link to="/login">
                    <Button btnLabel="Login" secondary={true} />
                    </Link>
                </div>
            </form>
            </>
        );
    }

}

export default CreateAccount;