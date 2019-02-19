const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');
const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');

exports.numberOfVariableFeatures = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let numberOfGroupingFeatures = await numberGroupesOr.numberGroupesOr(featureTree) + await numberGroupesXor.numberGroupesXor(featureTree);

    return numberOfGroupingFeatures + await numberOfOptionalFeatures.numberOfOptionalFeatures(featureTree);
}