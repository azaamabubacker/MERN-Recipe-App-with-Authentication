import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiHomeAlt2, BiEdit, BiSave } from "react-icons/bi";

import classes from "../components/Navigation.module.css";

function Navigation() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("jwtToken");
  };

  const isLoggedIn = cookies.access_token;
  const isUndfined = cookies.access_token === "undefined";

  return (
    <div className={classes.navigation}>
      <h1 className={classes.logo}>CookPad.</h1>
      <h1 className={classes["hide_logo"]}>CP.</h1>
      <Link to="/">
        <BiHomeAlt2 className={classes.icon} />
      </Link>
      <Link to="/create-recipe">
        {" "}
        <BiEdit className={classes.icon} />
      </Link>
      <Link to="/saved-recipes">
        {" "}
        <BiSave className={classes.icon} />
      </Link>

      <nav>
        <ul>
          <li className={classes.hide}>
            <Link to="/">Home</Link>
          </li>

          <li className={classes.hide}>
            <Link to="/create-recipe">Create Recipe</Link>
          </li>

          <li className={classes.hide}>
            <Link to="/saved-recipes">Saved Recipes</Link>
          </li>

          <div>
            <li className={classes.login}>
              {!cookies.access_token || isUndfined ? (
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
