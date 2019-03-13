/**
 * Number of grouping features (NGF)
 * This metric counts the number of features with at least one child
 * NGF = NF - NLeaf
 * NoF => Number of features
 * NLeaf => Number of leaf features
 */

const numberOfFeatures = require('./numberOfFeatures');
const numberOfLeafFeatures = require('./numberOfLeafFeatures');

exports.execute = (featureModel) => {
    let nOF = numberOfFeatures.execute(featureModel);
    let nLeaf = numberOfLeafFeatures.execute(featureModel);

    return nOF - nLeaf;
}
