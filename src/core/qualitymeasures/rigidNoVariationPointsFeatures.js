const numberOfFeatures = require('./numberOfFeatures');
const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let NF = await numberOfFeatures.execute(featureModel);
    let numberOfGroupingFeatures = await numberGroupesOr.execute(featureModel) + await numberGroupesXor.execute(featureModel);

    return NF - numberOfGroupingFeatures;
}
