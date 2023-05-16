import React, { useState } from "react";
import axios from "axios";
import classes from "../pages/CreateRecipe.module.css";
import { useGetUserId } from "../components/hooks/useGetUserId";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const userId = useGetUserId();

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const ingredientsHandler = (event) => {
    setIngredients(event.target.value);
  };

  const instructionsHandler = (event) => {
    setInstructions(event.target.value);
  };

  const imageUrlHandler = (event) => {
    setImageUrl(event.target.value);
  };

  const cookingTimeHandler = (event) => {
    setCookingTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const recipesData = {
      name: name,
      ingredients: ingredients,
      instructions: instructions,
      imageUrl: imageUrl,
      cookingTime: cookingTime,
      userOwner: userId,
    };

    axios
      .post("http://localhost:3001/recipes", recipesData, {})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes["create-recipe"]}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={nameHandler}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients :</label>
          <button type="button">Add</button>
          <button type="button">Remove</button>
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            onChange={ingredientsHandler}
            value={ingredients}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions :</label>
          <input
            id="instructions"
            type="text"
            name="instructions"
            onChange={instructionsHandler}
            value={instructions}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">ImageUrl :</label>
          <input
            id="imageUrl"
            type="text"
            name="imageUrl"
            onChange={imageUrlHandler}
            value={imageUrl}
          />
        </div>
        <div>
          <label htmlFor="cookingtime">Cooking Time :</label>
          <input
            id="cookingtime"
            type="text"
            name="cookingtime"
            onChange={cookingTimeHandler}
            value={cookingTime}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
