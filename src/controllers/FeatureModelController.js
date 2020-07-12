import FeatureModel from '../models/FeatureModel';

class FeatureModelController {
  async index(request, response) {
    try {
      const featureModels = await FeatureModel.find();

      return response.send(featureModels);
    } catch (error) {
      return response.status(400).send({ error });
    }
  }

  async store(request, response) {
    try {
      const { body } = request;
      const featureModel = await FeatureModel.create(body);

      return response.send(featureModel);
    } catch (error) {
      return response.status(400).send({ error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const featureModel = await FeatureModel.findById(id);

      if (!featureModel) {
        return response
          .status(404)
          .send({ message: 'feature model not found' });
      }

      return response.send(featureModel);
    } catch (error) {
      return response.status(400).send({ error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const featureModel = await FeatureModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      return response.send(featureModel);
    } catch (error) {
      return response.status(400).send({ error });
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      await FeatureModel.findByIdAndDelete(id);

      return response.send();
    } catch (error) {
      return response.status(400).send({ error });
    }
  }
}

export default new FeatureModelController();
