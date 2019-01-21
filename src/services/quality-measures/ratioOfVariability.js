/**
 * Ratio of variability (RoV)
 * The average number of children per parent node.
 * ∑(#Children + CogC) / ((NF + CogC) - NLeaf)
 * ∑(#Children) => sum of children features, i.e, NF - 1 (root)
 * CogC => Cognitive complexity
 * NF => Number of features
 * NLeaf => Number of leaf features
 */

exports.ratioOfVariability = (cogC, nF, nLeaf) => {
  return (nF + cogC - 1) / (nF + cogC - nLeaf);
};