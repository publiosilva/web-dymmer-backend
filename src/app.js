'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load routes
const indexRoutes = require('./routes/indexRoutes');
const XMLToJsonRoutes = require('./routes/XMLToJsonRoutes');
const userRoutes = require('./routes/userRoutes');
const featureModelRoutes = require('./routes/featureModelRoutes');
const qualityMeasureRoutes = require('./routes/qualityMeasure');

app.use('/', indexRoutes);
app.use('/xml', XMLToJsonRoutes);
app.use('/users', userRoutes);
app.use('/featuremodels', featureModelRoutes);
app.use('/qualitymeasures', qualityMeasureRoutes);

module.exports = app;
