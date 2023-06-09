import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import classes from "../Auth/Login.module.css";

function Login() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const backendUrl = "https://mern-recipe-app-jcb7.onrender.com";

  const loginHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    try {
      const result = await axios.post(`${backendUrl}/auth/login`, loginData);

      if (result.data.token) {
        // Succesfull Token
        // Set the Authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.token}`;

        // Set the cookie
        setCookies("access_token", result.data.token);
        console.log(cookies);

        // Save the token in local storage

        window.localStorage.setItem("jwtToken", result.data.token);

        // Navigate to the home page
        navigate("/");
      } else {
        console.error(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className={classes["form-container"]}>
        <h1>Login Here</h1>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={usernameHandler}
              value={enteredUsername}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={passwordHandler}
              value={enteredPassword}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
