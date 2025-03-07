const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  next({ status: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({
		status: "error",
		code: status,
		message,
  });
  
});

module.exports = app;
