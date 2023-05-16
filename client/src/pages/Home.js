import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../pages/Home.module.css";

function Home() {
  const [recipe, setRecipe] = useState([]);

  const fetchRecipes = async () => {
    const response = await axios.get("http://localhost:3001/recipes");
    setRecipe(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Available Recipes</h1>
      <div className={classes["recipe-container"]}>
        <ul>
          {recipe.map((recipeItem) => (
            <div>
              <li key={recipeItem.id}></li>
              <h2>{recipeItem.name}</h2>
              <ul className={classes.ingredient}>
                <h3>Ingredients</h3>
                {recipeItem.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions</h3>
              <p className={classes.instructions}>{recipeItem.instructions}</p>
              <img src={recipeItem.imageUrl} alt="Food Pic" />
              <p>Cooking Time: {recipeItem.cookingTime} Minutes</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
