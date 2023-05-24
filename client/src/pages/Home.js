import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../pages/Home.module.css";
import Card from "../components/UI/Card";

function Home() {
  const [recipe, setRecipe] = useState([]);

  const fetchRecipes = async () => {
    const response = await axios.get("http://localhost:3001/recipes");
    setRecipe(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const recipesList = recipe.map((recipeItems, index) => (
    <Card key={index}>
      <div>
        <h3>{recipeItems.name}</h3>
        <div>
          {recipeItems.ingredients.map((ingredientsList, index) => (
            <li key={index} className={classes.list}>
              {ingredientsList}
            </li>
          ))}
        </div>
        <h3>Instructions</h3>
        <div>{recipeItems.instructions}</div>
        <img src={recipeItems.imageUrl} alt="Food Pic" />
        <p> Cooking Time: {recipeItems.cookingTime} Min</p>
      </div>
    </Card>
  ));
  return (
    <div className={classes.recipe}>
      <h1>Available Recipes</h1>
      <ul>{recipesList}</ul>
    </div>
  );
}

export default Home;
