import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import classes from "./Register.module.css";

import axios from "axios";

function Register() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const usernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!usernameRegex.test(enteredUsername)) {
      setUsernameError(
        "Invalid username. It must be alphanumeric and contain 3 to 10 characters"
      );
      return;
    } else {
      setUsernameError("");
    }

    if (!passwordRegex.test(enteredPassword)) {
      setPasswordError(
        "Invalid Password. It must be at least 8 characters and contain uppercase, lowercase and numpers."
      );
      return;
    } else {
      setPasswordError("");
    }

    setIsLoading(true);

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        userData
      );
      if (response.status === 409) {
        setUserExist(true);
      } else {
        setRegSuccess(true);
        setUserExist(false);
        // setEnteredUsername("");
        // setEnteredPassword("");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setUserExist(true);
        setRegSuccess(false);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (regSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [regSuccess, navigate]);

  const override = {
    display: "block",
    margin: "0 auto",
  };

  const renderUserExistMessage = () => {
    if (userExist) {
      return <p>User Already Exists</p>;
    }
  };

  const reactSpinner = () => {
    if (isLoading) {
      return (
        <div className={classes.spinner}>
          <PulseLoader
            color="#00ADB5"
            loading={isLoading}
            cssOverride={override}
            size={10}
          />
        </div>
      );
    }

    return null; // Return null if isLoading is false
  };

  return (
    <div className={classes["register-form"]}>
      {reactSpinner()}
      {regSuccess && enteredUsername && enteredPassword && (
        <h2 style={{ color: "red", marginBottom: "2rem" }}>
          Registration Successful! Please login.
        </h2>
      )}
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
          {usernameError ? <p>{usernameError}</p> : null}
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
          {passwordError ? <p>{passwordError}</p> : null}
        </div>
        <button>Register</button>
      </form>
      {renderUserExistMessage()}
    </div>
  );
}

export default Register;
