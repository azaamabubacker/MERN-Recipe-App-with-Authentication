import express from "express";
import { RecipeModel } from "../models/Recipes.js";

// Create a new router instance
const router = express.Router();

// Define GET route for the recipes
router.get("/", async (req, res) => {
  // get all the recipes from the db.
  const recipes = await RecipeModel.find();
  res.json(recipes);
});

//  Define POST route for the recipes
router.post("/", async (req, res) => {
  // Create new recipe from request body
  const recipe = new RecipeModel({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  // Save the recipe to the db
  await recipe.save();

  // Send the recipe back to the client
  res.json(recipe);
});

// Define PUT Route for the recipe
router.put("/:id", async (req, res) => {
  // Get the recipe from the db
  const recipe = await RecipeModel.findById(req.params.id);

  // Update the recipe with the data from the request body.
  (recipe.name = req.body.name), (recipe.ingredients = req.body.ingredients);
  recipe.instructions = req.body.instructions;
  recipe.imageUrl = req.body.imageUrl;
  recipe.cookingTime = req.body.cookingTime;
  recipe.userOwner = req.body.userOwner;

  //   Save the recipe to the db
  recipe.save();

  // Send the recipe to the client
  res.json(recipe);
});

export { router as recipesRouter };
