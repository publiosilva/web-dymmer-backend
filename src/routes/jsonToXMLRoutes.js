"use strict";

const express = require("express");
const router = express.Router();

const JsonToXMLController = require("../controllers/JsonToXMLController");

router.post("/export-to-xml", JsonToXMLController.post);

module.exports = router;
