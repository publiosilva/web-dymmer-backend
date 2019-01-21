/**
 * Number of not leaf features (NGF)
 * This metric counts the number of features with at least one child
 * NGF = NF - NLeaf
 * NoF => Number of features
 * NLeaf => Number of leaf features
 */

exports.numberOfNotLeafFeatures = (nOF, nLeaf) => {
    return nOF - nLeaf;
}