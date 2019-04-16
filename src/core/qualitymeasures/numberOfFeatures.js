exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return 1 + await countNumberOfFeatures(featureTree);
}

countNumberOfFeatures = async (featureTree) => {
    let response = 0;

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            if (featureTree.children[i].type == 'g')
                response += await countNumberOfFeatures(featureTree.children[i]);
            else
                response += await countNumberOfFeatures(featureTree.children[i]) + 1;
        }
    }

    return response;
}
