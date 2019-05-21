const express = require('express');
const qualityMeasureDatasetController = require('../controllers/qualityMeasureDatasetController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

// router.use(authMiddleware);

router.post('/create', qualityMeasureDatasetController.create);
router.get('/list', qualityMeasureDatasetController.list);
router.get('/get/:qualityMeasureDatasetId', qualityMeasureDatasetController.get);
router.put('/update/:qualityMeasureDatasetId', qualityMeasureDatasetController.update);
router.delete('/remove/:qualityMeasureDatasetId', qualityMeasureDatasetController.remove);

module.exports = router;
