const numberOfFeatures = require('./numberOfFeatures');

exports.coefficientOfConnectivityDensity = async (featureModel) => {
    let featureTree = featureModel.feature_tree;

    let numberOfEdges = countNumberOfEdges(featureTree);
    let NF = numberOfFeatures.numberOfFeatures(featureTree);

    return numberOfEdges / NF;
}

countNumberOfEdges = (featureTree) => {
    let numberOfEdges = 0;

    featureTree.children.forEach(node => {
        numberOfEdges += 1 + countNumberOfEdges(node);
    });

    return numberOfEdges;
}