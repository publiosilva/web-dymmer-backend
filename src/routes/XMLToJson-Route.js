'use strict';

const express = require('express');
const router = express.Router();
const XMLToJsonController = require('../controllers/XMLToJson-Controller');

router.post('/xml-to-json', XMLToJsonController.post);

module.exports = router;