exports.numberOfGroupedFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == '')
                response += await this.numberOfGroupedFeatures(feature_tree.children[i]) + 1
            else
                response += await this.numberOfGroupedFeatures(feature_tree.children[i])
        }
    }
    return response;
}