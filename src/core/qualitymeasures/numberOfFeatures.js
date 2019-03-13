exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return await countNumberOfFeatures(featureTree) + 1;
}

countNumberOfFeatures = async (featureTree) => {
    let response = 0;

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            if (featureTree.children[i].type == 'g')
                response += await this.countNumberOfFeatures(featureTree.children[i]);
            else
                response += await this.countNumberOfFeatures(featureTree.children[i]) + 1;
        }
    }

    return response;
}
