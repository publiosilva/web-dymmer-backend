/**
 * Flexibility of configuration (FoC)
 * This metric calculates the ratio of the number of optional features over all available features.
 * FoC = NO / NF
 * NO => Number of optional features
 * NF => Number of features
 */

const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');
const numberOfFeatures = require('./numberOfFeatures');

exports.execute = (featureModel) => {
    let nO = numberOfOptionalFeatures.execute(featureModel);
    let nOF = numberOfFeatures.execute(featureModel);

    return nO / nOF;
}
