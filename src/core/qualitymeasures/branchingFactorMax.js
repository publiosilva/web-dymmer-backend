/**
 * Branching factor (BF)
 * This metric counts the number of features
 * in a model with a given number of children.
 */

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return await branchingFactorMax(featureTree);
};

const branchingFactorMax = async (featureTree) => {
    let response = 0;

    if (featureTree.children) {
        response = featureTree.children.length;

        for (let i = 0; i < featureTree.children.length; i++) {
            let rsp = await branchingFactorMax(featureTree.children[i]);
            if (rsp > response) response = rsp;
        }
    }

    return response;
}
