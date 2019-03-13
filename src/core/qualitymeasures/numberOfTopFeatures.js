exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return featureTree.children.length;
}
