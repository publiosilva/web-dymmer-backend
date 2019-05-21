'use strict';

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');

const XMLToJsonController = require('../controllers/XMLToJsonController');

// router.use(authMiddleware);

router.post('/xml-to-json', XMLToJsonController.post);

module.exports = router;
