const express = require('express');
const valeMethodController = require('../controllers/valeMethodController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

// router.use(authMiddleware);

router.post('/run', valeMethodController.run);
router.get('/thresholds', valeMethodController.getThresholds);

module.exports = router;
