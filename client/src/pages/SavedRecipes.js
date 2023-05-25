import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserId } from "../components/hooks/useGetUserId";
import Card from "../components/UI/Card";
import classes from "../pages/Home.module.css";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const user = useGetUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = user !== null;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/recipes/savedRecipes/${user}`)
        .then((response) => {
          setSavedRecipes(response.data.recipes);
        });
    }
  }, [user, navigate]);

  const editHandler = (recipeId) => {
    navigate(`edit-recipe/${recipeId}`);
  };

  const deleteHandler = (recipeId) => {
    axios
      .delete(`http://localhost:3001/recipes/${recipeId}`)
      .then((response) => {
        console.log({ response: "Recipe deleted successfully" });
      })
      .catch((error) => {
        console.log("Failed to delete recipe:", error);
      });
    window.location.reload();
  };

  const savedRecipesList = savedRecipes.map((recipeItems, index) => (
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
        <button
          type="button"
          onClick={() => {
            editHandler(recipeItems._id);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            deleteHandler(recipeItems._id);
          }}
        >
          Delete
        </button>
      </div>
    </Card>
  ));

  return (
    <div>
      <h1>Saved Recipes</h1>
      <div className={classes.recipe}>
        {Array.isArray(savedRecipes) && savedRecipes.length > 0 ? (
          savedRecipesList
        ) : (
          <p>No Saved Recipes</p>
        )}
      </div>
    </div>
  );
}

export default SavedRecipes;
