import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "../components/Navigation.module.css";

function Navigation() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("jwtToken");
  };

  const isLoggedIn = cookies.access_token;

  return (
    <div className={classes.navigation}>
      <h1>CookPad.</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Create Recipe</Link>
          </li>
          <li>
            <Link to="/create-recipe">Saved Recipes</Link>
          </li>
          <div>
            <li className={classes.login}>
              {!cookies.access_token ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              )}
            </li>
            <li className={isLoggedIn ? classes.undefined : classes.auth}>
              {isLoggedIn ? null : <Link to="/register">Register</Link>}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
