import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose
  .connect(
    "mongodb+srv://recipe-user:123@recipe.ejvyhbw.mongodb.net/recipe?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3001, () => {
      console.log("Server Started!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
