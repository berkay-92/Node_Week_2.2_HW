import request from "supertest";
import express, { urlencoded } from "express";
import postRouter from "../../controller/post-router";

const app = express();

app.use(urlencoded({ extended: false }));
app.use("/posts", postRouter);

describe("Testing User router", () => {
  it("should get all users", (done) => {
    request(app).get("/posts").expect("Content-Type", /json/).expect(200, done);
  });

  it("should get one post", () => {
    const postId = 2;
    request(app)
      .get(`/posts/${postId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            content: expect.any(String),
          })
        );
      });
  });

  it("GET /id => 404 if item not found", (done) => {
    const postId = 100000;
    request(app).get(`/posts/${postId}`).expect(404, done);
  });

  it("create a post", (done) => {
    const newPost = {
      id: 3,
      title: "HiCoders",
      content: "HTML",
    };
    request(app)
      .post("/posts")
      .send(newPost)
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("create a random post", (done) => {
    const randomPost = {
      id: 2,
      title: "Hicoders",
      content: "very good",
    };
    request(app)
      .post("/posts/fake")
      .send(randomPost)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
