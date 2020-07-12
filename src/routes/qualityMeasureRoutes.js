const express = require("express");
const qualityMeasureController = require("../controllers/qualityMeasureController");
const qualityMeasuresExportController = require("../controllers/qualityMeasuresExportController");

const router = express.Router();

// router.post('/create', qualityMeasureController.create);
router.get("/list", qualityMeasureController.list);
router.get("/get/:qualityMeasureId", qualityMeasureController.get);
// router.put('/update/:qualityMeasureId', qualityMeasureController.update);
// router.delete('/remove/:qualityMeasureId', qualityMeasureController.remove);
router.post("/apply", qualityMeasureController.apply);
router.post("/export-to-pdf", qualityMeasuresExportController.exportToPDF);
router.post("/export-to-csv", qualityMeasuresExportController.exportToCSV);

module.exports = router;
