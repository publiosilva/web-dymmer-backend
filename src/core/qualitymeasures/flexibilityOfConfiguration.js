/**
 * Flexibility of configuration (FoC)
 * This metric calculates the ratio of the number of optional features over all available features.
 * FoC = NO / NF
 * NO => Number of optional features
 * NF => Number of features
 */

const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');
const numberOfFeatures = require('./numberOfFeatures');

exports.execute = async (featureModel) => {
    let nO = await numberOfOptionalFeatures.execute(featureModel);
    let nOF = await numberOfFeatures.execute(featureModel);

    return nO / nOF;
}
