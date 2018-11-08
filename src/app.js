'use strict';

var express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const XMLToJsonRoute = require('./routes/XMLToJson-Route');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

app.use('/', indexRoute);
app.use('/xml', XMLToJsonRoute);

module.exports = app;