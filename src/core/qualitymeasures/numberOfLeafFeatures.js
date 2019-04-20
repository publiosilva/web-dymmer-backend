exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return await countNumberOfLeafFeatures(featureTree);
}

countNumberOfLeafFeatures = async (featureTree) => {
    let numberOfLeafFeatures = 0;

    if (featureTree.children.length === 0) {
        numberOfLeafFeatures += 1;
    } else {
        for (let i = 0; i < featureTree.children.length; i++) {
            let node = featureTree.children[i];
            numberOfLeafFeatures += await countNumberOfLeafFeatures(node);
        }
    }

    return numberOfLeafFeatures;
}
