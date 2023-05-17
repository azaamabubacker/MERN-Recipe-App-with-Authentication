import React from "react";
import classes from "../UI/Card.module.css";

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
