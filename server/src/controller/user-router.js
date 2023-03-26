import express from "express";
const userRouter = express.Router();

import userRepository from "../data/user-repository.js";

userRouter.get("/", (req, res) => {
  const users = userRepository.findAllusers();
  res.status(200).send(users);
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const searchedUser = userRepository.findUserById(userId);
  res.status(201).send(searchedUser);
});

export default userRouter;
