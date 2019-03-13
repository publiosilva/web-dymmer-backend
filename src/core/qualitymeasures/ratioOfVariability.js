/**
 * Ratio of variability (RoV)
 * The average number of children per parent node.
 * ∑(#Children + CogC) / ((NF + CogC) - NLeaf)
 * ∑(#Children) => sum of children features, i.e, NF - 1 (root)
 * CogC => Cognitive complexity
 * NF => Number of features
 * NLeaf => Number of leaf features
 */

const cognitiveComplexity = require('./cognitiveComplexity');
const numberOfFeatures = require('./numberOfFeatures');
const numberOfLeafFeatures = require('./numberOfLeafFeatures');

exports.execute = (featureModel) => {
    let cogC = cognitiveComplexity.execute(featureModel);
    let nOF = numberOfFeatures.execute(featureModel);
    let nLeaf = numberOfLeafFeatures.execute(featureModel);

    return (nOF + cogC - 1) / (nOF + cogC - nLeaf);
};
