const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');
const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let numberOfGroupingFeatures = await numberGroupesOr.execute(featureModel) + await numberGroupesXor.execute(featureModel);

    return numberOfGroupingFeatures + await numberOfOptionalFeatures.execute(featureModel);
}
