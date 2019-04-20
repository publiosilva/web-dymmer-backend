/**
 * Cognitive complexity (CogC)
 * Number of variation points
 * CogC = NOr + NXor
 * NOr => The number of OR-feature groups.
 * NXor => The number of XOR-feature groups
 */
const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');

exports.execute = async (featureModel) => {
    let nOr = await numberGroupesOr.execute(featureModel);
    let nXor = await numberGroupesXor.execute(featureModel);
    
    return nOr + nXor;
}
