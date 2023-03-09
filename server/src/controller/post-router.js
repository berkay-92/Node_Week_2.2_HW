import express from "express";
import { faker } from "@faker-js/faker";
const postRouter = express.Router();

import postRepository from "../data/post-repository.js";

postRouter.get("/", (req, res) => {
  const postList = postRepository.findAllPosts();
  res.status(200).send(postList);
});

postRouter.get("/:id", (req, res) => {
  const postId = req.params.id;
  const searchedPost = postRepository.findPostById(postId);
  res.status(201).send(searchedPost);
});

postRouter.post("/", (req, res) => {
  const post = req.body;
  const newPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  };
  const addedPost = postRepository.createPost(newPost);
  res.status(201).send(addedPost);
});

postRouter.delete("/:id", (req, res) => {
  const postId = req.params.id;
  postRepository.deletePost(postId);
  res.status(200).send(postId);
});

postRouter.put("/:id", (req, res) => {
  const post = req.body;
  const postId = req.params.id;
  const updatedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  };
  const editedPost = postRepository.updatePost(updatedPost, postId);
  res.status(201).send(editedPost);
});

postRouter.post("/faker", (req, res) => {
  const fakePost = {
    id: faker.datatype.uuid(),
    title: faker.random.words(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    updateAt: faker.date.past(),
  };
  const addedFakerPost = postRepository.createFakerPost(fakePost);
  res.status(201).send(addedFakerPost);
});

export default postRouter;
