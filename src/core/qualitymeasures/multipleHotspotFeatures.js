exports.execute = async (featureModel) => {
    const [featureTree] = featureModel.feature_tree;

    return multipleHotspotFeatures(featureTree);
};

function multipleHotspotFeatures(featureTree) {
    let counter = 0;

    if (featureTree.type === "g" && featureTree.multiplicity === "1,*") {
        counter += featureTree.children.length;
    }

    for (let i = 0; i < featureTree.children.length; i++) {
        let node = featureTree.children[i];

        counter += multipleHotspotFeatures(node);
    }

    return counter;
}
