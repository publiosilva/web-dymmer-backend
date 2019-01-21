/**
 * Cognitive complexity (CogC)
 * Number of variation points
 * CogC = NOr + NXor
 * NOr => The number of OR-feature groups.
 * NXor => The number of XOR-feature groups
 */

 exports.cognitiveComplexity = (nOr, nXor) => {
    return nOr + nXor;
 }