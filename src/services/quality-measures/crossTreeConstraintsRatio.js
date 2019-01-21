/**
 * Cross tree-constraints ratio (CTCR)
 * This metric counts the number of distinct features involved in cross-
 * tree constraints an divides them through the total number of features in
 * the feature model.
 * CTCR = NFRI / NoF
 * NoF => Number of features
 * NFRI => number of distinct features involved in cross-tree constraints
 */

exports.crossTreeConstraintsRatio = (nFri, nOF) => {
    return nFri / nOF;
}