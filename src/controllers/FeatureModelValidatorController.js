import validateFeatureModel from '../util/validateFeatureModel';

class FeatureModelValidatorController {
  async validate(request, response) {
    try {
      const { body } = request;
      const issues = validateFeatureModel(body);

      return response.send({ isValid: !issues.length, issues });
    } catch (error) {
      return response.status(400).send({ error });
    }
  }
}

export default new FeatureModelValidatorController();
