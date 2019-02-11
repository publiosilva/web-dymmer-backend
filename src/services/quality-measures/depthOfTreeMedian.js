/**
 * Depth of tree median (DT Median)
 * This metric calculates the average between the median paths from the root tree to the leaves.
 * ∑(#depth of the median paths)
 */

exports.depthOfTreeMedian = async feature_tree => {
    let paths = [];
    await depthOfTree(feature_tree, paths, 0);

    let numPaths = paths.length;

    if (numPaths%2==0) {
        let medianPaths = paths.slice(numPaths-1, numPaths+1)
        let sumDepths = medianPaths[0] + medianPaths[1];
        return sumDepths / 2;
    }
    else
        return paths[Math.floor(numPaths/2)];
  }

  depthOfTree = async (feature_tree, paths, depth) => {
    let flag = false;

    for (node in feature_tree.children) {
      flag = true;
      await depthOfTree(feature_tree.children[node], paths, depth + 1);
    }

    if (!flag) paths.push(depth);
  }
