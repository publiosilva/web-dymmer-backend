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

// var xmlParser = require('express-xml-bodyparser');
// app.use(xmlParser());

app.use('/', indexRoute);
app.use('/xml', XMLToJsonRoute);

module.exports = app;