const numberOfFeatures = require('./numberOfFeatures');
const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let NF = await numberOfFeatures.numberOfFeatures(featureTree);
    let numberOfGroupingFeatures = await numberGroupesOr.numberGroupesOr(featureTree) + await numberGroupesXor.numberGroupesXor(featureTree);

    return NF - numberOfGroupingFeatures;
}
