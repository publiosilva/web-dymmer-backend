const numberOfFeatures = require('./numberOfFeatures');

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    let numberOfFeaturesChildrenOGroupsXor = countNumberOfFeaturesChildrenOfGroupsXor(featureTree);
    let NF = await numberOfFeatures.execute(featureModel);

    return numberOfFeaturesChildrenOGroupsXor / NF;
}

countNumberOfFeaturesChildrenOfGroupsXor = (featureTree) => {
    let numberOfFeaturesChildrenOGroupsXor = 0;

    featureTree.children.forEach(node => {
        if (node.type === 'g' && node.multiplicity === '1,1') {
            numberOfFeaturesChildrenOGroupsXor += node.children.length;
        } else {
            numberOfFeaturesChildrenOGroupsXor += countNumberOfFeaturesChildrenOfGroupsXor(node);
        }
    });

    return numberOfFeaturesChildrenOGroupsXor;
}
