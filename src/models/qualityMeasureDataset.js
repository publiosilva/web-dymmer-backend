const mongoose = require('../database/index');

const qualityMeasureDatasetSchema = new mongoose.Schema({
    featureModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeatureModels',
        required: true,
    },
    qualityMeasures: [{
        qualityMeasureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QualityMeasure',
            required: true,
        },
        qualityMeasureValue: {
            type: Number,
            required: true,
        },
    }],
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const QualityMeasureDataset = mongoose.model('QualityMeasureDataset', qualityMeasureDatasetSchema);

module.exports = QualityMeasureDataset;
