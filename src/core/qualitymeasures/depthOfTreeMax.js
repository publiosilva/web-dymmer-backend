exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree;

    return calcDepthOfTreeMax(featureTree);
}

calcDepthOfTreeMax = async (featureTree) => {
    // includes the root and the last leaf
    let maxOfTheChildren = 2;

    for (node in featureTree.children) {
        let x = await calcDepthOfTreeMax(node);

        if (x > maxOfTheChildren) {
            maxOfTheChildren = x;
        }
    }

    return maxOfTheChildren + 1;
}
