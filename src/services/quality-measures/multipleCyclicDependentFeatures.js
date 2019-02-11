/**
 * Multiple Cyclic Dependent Features (MCDF)
 * MCDF = ∑(Number of participants in feature constraints and children of OR groups)
 */

exports.multipleCyclicDependentFeatures = async (featureModel) => {
    let feature_tree = featureModel.feature_tree[0];
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
    conFeatures = conFeatures.filter( (elem, i ) => {
        return conFeatures.indexOf( elem ) === i;
    } );

    return await countFeatureConstraintsChildrenOfORGroups(feature_tree, conFeatures);
}

async function countFeatureConstraintsChildrenOfORGroups (feature_tree, featConstList) {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {

            featConstList.forEach(featureId => {
                if (feature_tree.children[i].id === featureId && feature_tree.children[i].type === 'o')
                    response += 1;
            })
            response += await countFeatureConstraintsChildrenOfORGroups(feature_tree.children[i], featConstList)
        }
    }
    return response;
}