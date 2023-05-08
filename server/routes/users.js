import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

const router = express.Router();

//REGISTER POST
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (user) {
    return res.json({ message: "User Already Exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  newUser.save();

  res.json({ message: "User Registered Successfully!" });
});

//LOGIN POST
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secretKey");

  res.json({ token, userId: user._id });
});

export { router as userRouter };
