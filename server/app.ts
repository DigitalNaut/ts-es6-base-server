import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();
const port = 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
