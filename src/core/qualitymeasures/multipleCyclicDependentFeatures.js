/**
 * Multiple Cyclic Dependent Features (MCDF)
 * MCDF = ∑(Number of participants in feature constraints and children of OR groups)
 */

exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];
    let constraints = featureModel.constraints;
    let conKeys;
    let conFeatures = [];

    constraints.forEach(element => {
        conKeys = Object.values(element)[0].replace(/[\s\W-]+/g, '').split('or');

        conKeys.forEach(feature => {
            conFeatures.push(feature)
        })
    });

    // remove duplicate items
    conFeatures = conFeatures.filter((elem, i) => {
        return conFeatures.indexOf(elem) === i;
    });

    return await countFeatureConstraintsChildrenOfORGroups(featureTree, conFeatures);
}

async function countFeatureConstraintsChildrenOfORGroups(featureTree, featConstList) {
    let response = 0

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            featConstList.forEach(featureId => {
                if (featureTree.children[i].id === featureId && featureTree.children[i].type === 'o')
                    response += 1;
            });

            response += await countFeatureConstraintsChildrenOfORGroups(featureTree.children[i], featConstList)
        }
    }

    return response;
}
