const numberOfFeatures = require('./numberOfFeatures');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];
    let numberOfEdges = countNumberOfEdges(featureTree);
    let NF = await numberOfFeatures.execute(featureModel);

    return numberOfEdges / NF;
}

const countNumberOfEdges = (featureTree) => {
    let numberOfEdges = 0;

    featureTree.children.forEach(node => {
        numberOfEdges += 1 + countNumberOfEdges(node);
    });

    return numberOfEdges;
}
