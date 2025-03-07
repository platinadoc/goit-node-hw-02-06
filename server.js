const app = require("./app");
const mongoose = require("mongoose");
const { PORT, DB_HOST } = require("./helpers/env");
	
// require("dotenv").config();
// const { PORT = 3000, DB_HOST } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() => {
		console.log("Database connection successful");
		app.listen(PORT);
	})
	.then(() => {
		console.log(`Server is on ${PORT}`);
	})
	.catch((err) => {
		console.log("ERROR", err);
		process.exit(1);
  });
  