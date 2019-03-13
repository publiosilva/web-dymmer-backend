const express = require('express');
const featureModelController = require('../controllers/featureModelController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

router.use(authMiddleware);

router.post('/create', featureModelController.create);
router.get('/list', featureModelController.list);
router.get('/get/:featureModelId', featureModelController.get);
router.put('/update/:featureModelId', featureModelController.update);
router.delete('/remove/:featureModelId', featureModelController.remove);

module.exports = router;
