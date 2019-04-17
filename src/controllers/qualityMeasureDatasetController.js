const qualityMeasureDataset = require('../models/qualityMeasureDataset');

const create = async (req, res) => {
    try {
        const newQualityMeasureDataset = await qualityMeasureDataset.create(req.body);

        return res.status(200).send({ newQualityMeasureDataset });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new quality measure dataset' });
    }
}

const list = async (req, res) => {
    try {
        const qualityMeasureDatasetList = await qualityMeasureDataset.find();

        return res.status(200).send({ qualityMeasureDatasetList });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading quality measure datasets' });
    }
}

const get = async (req, res) => {
    try {
        const returnedQualityMeasureDataset = await qualityMeasureDataset.findById(req.params.qualityMeasureDatasetId);

        return res.status(200).send({ returnedQualityMeasureDataset });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading quality measure dataset' });
    }
}

const update = async (req, res) => {
    try {
        const updatedQualityMeasureDataset = await qualityMeasureDataset.findByIdAndUpdate(req.params.qualityMeasureDatasetId, req.body, { new: true });

        return res.status(200).send({ updatedQualityMeasureDataset });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating quality measure dataset' });
    }
}

const remove = async (req, res) => {
    try {
        await qualityMeasureDataset.findByIdAndDelete(req.params.qualityMeasureDatasetId);

        return res.status(200).send({ message: 'Quality measure dataset has removed' });
    } catch (err) {
        return res.status(400).send({ error: 'Error removing quality measure dataset' });
    }
}

module.exports = { create, list, get, update, remove };
