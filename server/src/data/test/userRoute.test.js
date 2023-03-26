import request from "supertest";
import express, { urlencoded } from "express";
import userRouter from "../../controller/user-router";

const app = express();

app.use(urlencoded({ extended: false }));
app.use("/users", userRouter);

describe("Testing User router", () => {
  it("should get all users", (done) => {
    request(app).get("/users").expect("Content-Type", /json/).expect(200, done);
  });

  it("should get one user", () => {
    const userId = 2;
    request(app)
      .get(`/users/${userId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
          })
        );
      });
  });

  it("GET /id => 404 if item not found", (done) => {
    const userId = 100000;
    request(app).get(`/users/${userId}`).expect(404, done);
  });
});
