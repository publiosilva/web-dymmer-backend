/**
 * Number of grouping features (NGF)
 * This metric counts the number of features with at least one child
 * NGF = NF - NLeaf
 * NoF => Number of features
 * NLeaf => Number of leaf features
 */

exports.numberOfGroupingFeatures = (nOF, nLeaf) => {
    return nOF - nLeaf;
}