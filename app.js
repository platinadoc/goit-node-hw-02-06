const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authUser);
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
  next({ status: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
});

module.exports = app;
