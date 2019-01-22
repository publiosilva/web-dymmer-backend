const numberOfLeafFeatures = require('./numberOfLeafFeatures');
const singleCyclicDependentFeatures = require('./singleCyclicDependentFeatures');
const multipleCyclicDependentFeatures = require('./multipleCyclicDependentFeatures');

exports.featuresExtendibility = async (featureModel) => {
    let NLEAF = numberOfLeafFeatures.numberOfLeafFeatures(featureModel);
    let SCDF = singleCyclicDependentFeatures.singleCyclicDependentFeatures(featureModel);
    let MCDF = multipleCyclicDependentFeatures.multipleCyclicDependentFeatures(featureModel);

    return NLEAF + SCDF + MCDF;
}