import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

const router = express.Router();

//REGISTER POST
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Regex patterns
  // Alphanumeric and underscore, 3 to 20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,10}$/;
  // At least 8 characters, contains uppercase, lowercase, and numbers
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!usernameRegex.test(username)) {
    return res.json({
      message:
        "Invalid username. It must be alphanumeric and contain 3 to 10 characters.",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.json({
      message:
        "Invalid password. It must be at least 8 characters and contain uppercase, lowercase and numpers.",
    });
  }

  const user = await UserModel.findOne({ username: username });

  if (user) {
    return res.status(409).json({ message: "User Already Exists!" });
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
    return res
      .status(401)
      .json({ message: "Username or Password is Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secretKey");

  try {
    // Verify the token
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      }

      res.json({ token, userId: user._id });

      console.log("userId:", user._id);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as userRouter };
