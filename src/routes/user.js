const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/register', userController.register);
router.post('/authenticate'), userController.authenticate;

module.exports = router;
