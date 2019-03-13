exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];
    let response = 0;

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            if (featureTree.children[i].type == '')
                response += await this.numberOfGroupedFeatures(featureTree.children[i]) + 1;
            else
                response += await this.numberOfGroupedFeatures(featureTree.children[i]);
        }
    }

    return response;
}
