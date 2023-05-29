import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../pages/CreateRecipe.module.css";
import { useGetUserId } from "../components/hooks/useGetUserId";
import { useNavigate, useParams } from "react-router-dom";

function CreateRecipe() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const userId = useGetUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/recipes/${id}`)
        .then((response) => {
          const recipe = response.data;
          setName(recipe.name);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
          setImageUrl(recipe.imageUrl);
          setCookingTime(recipe.cookingTime);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  // Adding ingrednets inputs dynmaically
  const ingredientsHandler = (event, index) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
  };

  const addIngredients = (index) => {
    const values = [...ingredients];
    values.push({ value: "" });
    setIngredients(values);
  };

  const removeIngredients = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
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

    if (id) {
      // Updating an existing recipe
      axios
        .put(`http://localhost:3001/recipes/${id}`, recipesData)
        .then((response) => {
          console.log(response);
          navigate("/saved-recipes");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Creating a new recipe
      axios
        .post("http://localhost:3001/recipes", recipesData)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setName("");
    setIngredients([]);
    setInstructions("");
    setImageUrl("");
    setCookingTime("");
  };

  useEffect(() => {
    const isLoggedIn = userId !== null;
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [userId, navigate]);

  return (
    <div className={classes["create-recipe"]}>
      <h1>Create Recipe</h1>
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
        <div className={classes["btn-container"]}>
          <label htmlFor="ingredients">Ingredients :</label>
          <button type="button" onClick={addIngredients}>
            Add
          </button>
          <button
            className={classes.remove}
            type="button"
            onClick={removeIngredients}
          >
            Remove
          </button>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="Ingredients"
                value={ingredient.value}
                onChange={(event) => ingredientsHandler(event, index)}
              />
            </div>
          ))}
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
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
