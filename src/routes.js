import express from 'express';
import FeatureModelController from './controllers/FeatureModelController';
import FeatureModelValidatorController from './controllers/FeatureModelValidatorController';
import ThresholdController from './controllers/ThresholdController';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send({
    title: 'Dymmer Extension Service',
    version: '0.0.1',
  });
});

// routes.get('/feature-models', FeatureModelController.index);
// routes.get('/feature-models/:id', FeatureModelController.show);
// routes.post('/feature-models', FeatureModelController.store);
// routes.put('/feature-models/:id', FeatureModelController.update);
// routes.delete('/feature-models/:id', FeatureModelController.destroy);

routes.post(
  '/feature-models/validate',
  FeatureModelValidatorController.validate
);

routes.post('/thresholds/derive', ThresholdController.deriveThresholds);

export default routes;
