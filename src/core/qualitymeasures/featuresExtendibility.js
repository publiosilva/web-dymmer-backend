const numberOfLeafFeatures = require('./numberOfLeafFeatures');
const singleCyclicDependentFeatures = require('./singleCyclicDependentFeatures');
const multipleCyclicDependentFeatures = require('./multipleCyclicDependentFeatures');

exports.execute = async (featureModel) => {
    let NLEAF = await numberOfLeafFeatures.execute(featureModel);
    let SCDF = await singleCyclicDependentFeatures.execute(featureModel);
    let MCDF = await multipleCyclicDependentFeatures.execute(featureModel);

    return NLEAF + SCDF + MCDF;
}
