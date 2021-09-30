const express = require('express');
var bodyParser = require('body-parser')
const router = require('./router');
require("dotenv").config();
const app = express()

app.use(bodyParser.json())
app.use('/', router);


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})