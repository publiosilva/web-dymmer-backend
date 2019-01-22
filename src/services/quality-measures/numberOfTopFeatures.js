exports.numberOfTopFeatures = async (featureModel) => {
    let featureTree = featureModel.feature_tree;

    return featureTree.children.length;
}