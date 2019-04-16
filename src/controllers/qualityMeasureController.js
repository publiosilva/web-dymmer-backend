const qualityMeasure = require('../models/qualityMeasure');
const featureModel = require('../models/featureModel');

const create = async (req, res) => {
    try {
        const newQualityMeasure = await qualityMeasure.create(req.body);

        return res.status(200).send({ newQualityMeasure });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new quality measure' });
    }
}

const list = async (req, res) => {
    try {
        const qualityMeasureList = await qualityMeasure.find();

        return res.status(200).send({ qualityMeasureList });
    } catch (err) {
        return res.status(200).send({ error: 'Error loading quality measures' });
    }
}

const get = async (req, res) => {
    try {
        const returnedQualityMeasure = await qualityMeasure.findById(req.params.qualityMeasureId);

        return res.status(200).send({ returnedQualityMeasure });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading quality measure' });
    }
}

const update = async (req, res) => {
    try {
        const updatedQualityMeasure = await qualityMeasure.findByIdAndUpdate(req.params.qualityMeasureId, req.body, { new: true });

        return res.status(200).send({ updatedQualityMeasure });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating quality measure' });
    }
}

const remove = async (req, res) => {
    try {
        await qualityMeasure.findByIdAndDelete(req.params.qualityMeasureId);

        return res.status(200).send({ message: 'Quality measure has removed' });
    } catch (err) {
        return res.status(400).send({ error: 'Error removing quality measure' });
    }
}

const apply = async (req, res) => {
    const returnedFeatureModel = await featureModel.findById(req.params.featureModelId);
    const appliedQualityMeasuresList = [];

    for (let i = 0; i < req.body.measures.length; i++) {
        let element = req.body.measures[i];
        let appliedQualityMeasureResult = {
            measure: element,
            value: null
        };
        let path = '../core/qualitymeasures/' + element.file;
        appliedQualityMeasureResult.value = await require(path).execute(JSON.parse(returnedFeatureModel.featureModelJson));
        appliedQualityMeasuresList.push(appliedQualityMeasureResult);
    }

    return res.status(200).send({ appliedQualityMeasuresList });
}

module.exports = { create, list, get, update, remove, apply };
