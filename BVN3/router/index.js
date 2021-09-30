const express = require('express');
const useRouter = require('./user');
const loginRouter = require('./login');
const app = express();
app.use('/user',useRouter);
app.use('/login',loginRouter);
module.exports = app;