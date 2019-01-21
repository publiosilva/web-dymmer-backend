/**
 * Branching factor (BF)
 * This metric counts the number of features
 * in a model with a given number of children.
 */

exports.branchingFactor = async feature_tree => {
  let response = 0;
  if (feature_tree.children) {
    response = feature_tree.children.length;

    for (let i = 0; i < feature_tree.children.length; i++) {
      let rsp = await this.branchingFactor(feature_tree.children[i]);
      if (rsp > response) response = rsp;
    }
  }
  return response;
};
