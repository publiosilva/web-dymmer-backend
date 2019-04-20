const numberOfFeatures = require('./numberOfFeatures');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let numberOfFeaturesChildrenOGroupsOr = countNumberOfFeaturesChildrenOfGroupsOr(featureTree);
    let NF = await numberOfFeatures.execute(featureModel);

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
