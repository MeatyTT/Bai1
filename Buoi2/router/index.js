const express = require('express');

const userRouter = require('./user');

const app = express();

const middlewarw = (req, res, next) => {
    console.log(req);
    next();
}

app.use('/user',userRouter);

app.use(express.static('anh'))
module.exports = app;