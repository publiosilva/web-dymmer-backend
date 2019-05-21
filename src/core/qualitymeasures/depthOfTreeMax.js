exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return calcDepthOfTreeMax(featureTree);
}

calcDepthOfTreeMax = async (featureTree) => {
    // includes the root and the last leaf
    let maxOfTheChildren = 2;

    for (let i = 0; i < featureTree.children.length; i++) {
        let node = featureTree.children[i];
        let x = await calcDepthOfTreeMax(node);

        if (x > maxOfTheChildren) {
            maxOfTheChildren = x;
        }
    }

    return maxOfTheChildren + 1;
}
