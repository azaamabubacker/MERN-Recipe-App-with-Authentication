import React, { useState } from "react";
import classes from "./Register.module.css";

import axios from "axios";

function Register() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const usernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const registerHandler = (event) => {
    event.preventDefault();
    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    axios
      .post("http://localhost:3001/auth/register", userData)
      .then((response) => {
        console.log(response.userData);
      })
      .catch((err) => {
        console.log(err);
      });

    setEnteredUsername("");
    setEnteredPassword("");
  };

  return (
    <div className={classes["register-form"]}>
      <h1>Register Here</h1>
      <form onSubmit={registerHandler}>
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
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
