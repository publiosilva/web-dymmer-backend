/**
 * Depth of tree median (DT Median)
 * This metric calculates the average between the median paths from the root tree to the leaves.
 * ∑(#depth of the median paths)
 */

exports.execute = async (featureModel) => {
    let featureModel = featureModel.feature_tree[0];
    let paths = [];

    await depthOfTree(featureTree, paths, 0);

    let numPaths = paths.length;

    if (numPaths % 2 == 0) {
        let medianPaths = paths.slice(numPaths - 1, numPaths + 1)
        let sumDepths = medianPaths[0] + medianPaths[1];
        return sumDepths / 2;
    } else
        return paths[Math.floor(numPaths / 2)];
}

depthOfTree = async (featureTree, paths, depth) => {
    let flag = false;

    for (node in featureTree.children) {
        flag = true;
        await depthOfTree(featureTree.children[node], paths, depth + 1);
    }

    if (!flag) paths.push(depth);
}
