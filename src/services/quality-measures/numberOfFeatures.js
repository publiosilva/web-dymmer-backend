exports.numberOfFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'g')
                response += await this.numberOfFeatures(feature_tree.children[i])
            else
                response += await this.numberOfFeatures(feature_tree.children[i]) + 1
        }
    }
    return response;
}