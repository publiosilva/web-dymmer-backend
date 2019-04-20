exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return await numberOfMandatoryFeatures(featureTree);
}

const numberOfMandatoryFeatures = async (featureTree) => {
    let response = 0;

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            if (featureTree.children[i].type == 'm')
                response += await numberOfMandatoryFeatures(featureTree.children[i]) + 1;
            else
                response += await numberOfMandatoryFeatures(featureTree.children[i]);
        }
    }

    return response;
}
