const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/list', userController.list);
router.get('/get/:userId', userController.get);
router.delete('/remove/:userId', userController.remove);

module.exports = router;
