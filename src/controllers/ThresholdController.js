import deriveThresholdsByValeMethod from '../thresholds/deriveThresholdsByValeMethod';

class ThresholdController {
  async deriveThresholds(request, response) {
    const { body } = request;

    return response.send(deriveThresholdsByValeMethod(body));
  }
}

export default new ThresholdController();
