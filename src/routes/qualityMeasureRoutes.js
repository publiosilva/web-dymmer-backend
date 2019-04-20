const express = require('express');
const qualityMeasureController = require('../controllers/qualityMeasureController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

router.use(authMiddleware);

// router.post('/create', qualityMeasureController.create);
router.get('/list', qualityMeasureController.list);
router.get('/get/:qualityMeasureId', qualityMeasureController.get);
// router.put('/update/:qualityMeasureId', qualityMeasureController.update);
// router.delete('/remove/:qualityMeasureId', qualityMeasureController.remove);
router.post('/apply/:featureModelId', qualityMeasureController.apply);

module.exports = router;
