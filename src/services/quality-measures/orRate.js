const numberOfFeatures = require('./numberOfFeatures');

exports.orRate = async (featureModel) => {
    let featureTree = featureModel.feature_tree;

    let numberOfFeaturesChildrenOGroupsOr = countNumberOfFeaturesChildrenOfGroupsOr(featureTree);
    let NF = numberOfFeatures.numberOfFeatures(featureTree);

    return numberOfFeaturesChildrenOGroupsOr / NF;
}

countNumberOfFeaturesChildrenOfGroupsOr = (featureTree) => {
    let numberOfFeaturesChildrenOGroupsOr = 0;

    featureTree.children.forEach(node => {
        if (node.type === 'g' && node.multiplicity === '1,*') {
            numberOfFeaturesChildrenOGroupsOr += node.children.length;
        } else {
            numberOfFeaturesChildrenOGroupsOr += countNumberOfFeaturesChildrenOfGroupsOr(node);
        }
    });

    return numberOfFeaturesChildrenOGroupsOr;
}