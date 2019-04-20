exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];
    let constraints = featureModel.constraints;

    return countSingleCyclicDependentFeatures(featureTree, constraints);
}

countSingleCyclicDependentFeatures = (featureTree, constraints) => {
    let numberOfSingleCyclicDependentFeatures = 0;

    featureTree.children.forEach(node => {
        if (node.type === 'g' && node.multiplicity === '1,1') {
            node.children.forEach(child => {
                if (theNodeParticipatesInAConstraint(child, constraints)) {
                    numberOfSingleCyclicDependentFeatures += 1;
                }
            });
        }

        numberOfSingleCyclicDependentFeatures += countSingleCyclicDependentFeatures(node, constraints);
    });

    return numberOfSingleCyclicDependentFeatures;
}

theNodeParticipatesInAConstraint = (node, constraints) => {
    let participates = false;

    constraints.forEach(constraint => {
        if (constraint.value.indexOf(node.id + ' ') !== -1 ||
            constraint.value.indexOf(' ' + node.id) !== -1 ||
            constraint.value.indexOf(' ~' + node.id) !== -1) {
            participates = true;
        }
    });

    return participates;
}
