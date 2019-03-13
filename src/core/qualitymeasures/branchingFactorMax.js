/**
 * Branching factor (BF)
 * This metric counts the number of features
 * in a model with a given number of children.
 */

exports.execute = async (featureModel) => {
    let featureTree = featureModel.featureTree[0];
    let response = 0;
    
    if (featureTree.children) {
        response = featureTree.children.length;

        for (let i = 0; i < featureTree.children.length; i++) {
            let rsp = await this.branchingFactorMax(featureTree.children[i]);
            if (rsp > response) response = rsp;
        }
    }

    return response;
};
