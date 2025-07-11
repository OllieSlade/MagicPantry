import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginLayout from "./pages/loginLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import Profile from "./pages/profile";
import NoPage from "./pages/NoPage";

let didInit = false;

function getPantry() {
  return fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "getPantry" })
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Error fetching pantry:", error);
        return [];
      });
}

function getUser() {
    return fetch(`${window.location.origin}/.netlify/functions/database`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "getUser" })
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });
};


function App() {
  const [ingredientsList, setIngredient] = useState([]);
  const [accountName, setAccountName] = useState("");

  function initialise() {
    getPantry().then((data) => {
        if (data) {
          data.forEach(element => {
              setIngredient(prev => [
                  ...prev,
                  { id: element.id, ingredient: element.item_name, include: element.include, quantity: element.quantity }
              ]);
          });
        }
      });

      getUser().then((data) => {
        if (data) {
          setAccountName(data.username);
        }
      });
    }

  if (!didInit) {
    didInit = true;
    initialise();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout accountName={accountName} />}>
          <Route index element={<Home ingredientsList={ingredientsList} accountName={accountName} setIngredient={setIngredient} />} />
          <Route element={<LoginLayout />}>
            <Route path="login" element={<Login initialise={initialise} />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="create-account" element={<CreateAccount />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="profile" element={<Profile accountName={accountName} setAccountName={setAccountName} setIngredient={setIngredient} />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
