/**
 * Depth of tree mean (DT Mean)
 * This metric calculates the average between the paths from the root tree to the leaves.
 * ∑(#depth of the paths)/number of paths
 */

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];
    let paths = [];
    await depthOfTree(featureTree, paths, 0);

    let sumDepths = paths.reduce((a, b) => a + b, 0);
    return sumDepths / paths.length;
}

depthOfTree = async (featureTree, paths, depth) => {
    let flag = false;

    for (node in featureTree.children) {
        flag = true;
        await depthOfTree(featureTree.children[node], paths, depth + 1);
    }

    if (!flag) paths.push(depth);
}
