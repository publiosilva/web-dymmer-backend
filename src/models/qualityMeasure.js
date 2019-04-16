const mongoose = require('../database/index');

const qualityMeasureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    file: {
        type: String,
        required: true,
        unique: true,
    },
    initials: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    computation: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const QualityMeasure = mongoose.model('QualityMeasure', qualityMeasureSchema);

module.exports = QualityMeasure;
