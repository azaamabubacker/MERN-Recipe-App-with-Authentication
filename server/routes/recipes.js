import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

// Create a new router instance
const router = express.Router();

// Define GET route for the recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.json(recipes);
  } catch (err) {
    res.json(err);
  }
});

// GET route for users created recipes
router.get("/savedRecipes/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const recipes = await RecipeModel.find({ userOwner: user._id });
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route for getting recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define POST Route
router.post("/", async (req, res) => {
  const recipe = new RecipeModel({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  try {
    const response = await recipe.save();
    // Save the recipe to the db
    await recipe.save();
    // Send the recipe back to the client
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define PUT Route for the recipe
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internel Server Error." });
  }
});
export { router as recipesRouter };

// Define DELETE Route.
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
