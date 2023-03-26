import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./controller/post-router.js";
import userRouter from "./controller/user-router.js";

const app = Express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
