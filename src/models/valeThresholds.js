const mongoose = require('../database/index');

const valeThresholdSchema = new mongoose.Schema({
    thresholds: [{
        qualityMeasure: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QualityMeasure',
            required: true,
        },
        veryLow: {
            type: Number,
            required: true,
        },
        low: {
            type: Number,
            required: true,
        },
        moderate: {
            type: Number,
            required: true,
        },
        high: {
            type: Number,
            required: true,
        },
        veryHigh: {
            type: Number,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ValeThreshold = mongoose.model('ValeThreshold', valeThresholdSchema);

module.exports = ValeThreshold;
