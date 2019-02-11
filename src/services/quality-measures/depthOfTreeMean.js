/**
 * Depth of tree mean (DT Mean)
 * This metric calculates the average between the paths from the root tree to the leaves.
 * ∑(#depth of the paths)/number of paths
 */

exports.depthOfTreeMean = async feature_tree => {
  let paths = [];
  await depthOfTree(feature_tree, paths, 0);

  let sumDepths = paths.reduce((a, b) => a + b, 0);
  return sumDepths / paths.length;
}

depthOfTree = async (feature_tree, paths, depth) => {
  let flag = false;

  for (node in feature_tree.children) {
    flag = true;
    await depthOfTree(feature_tree.children[node], paths, depth + 1);
  }

  if (!flag) paths.push(depth);
}
