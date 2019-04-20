exports.execute = (featureModel) => {
    let constraints = featureModel.constraints;

    if (constraints.length !== 0) {
        return countNumberOfFeaturesReferencedInConstraints(constraints);
    }

    return 0;
}

countNumberOfFeaturesReferencedInConstraints = async (constraints) => {
    let numberOfFeaturesReferencedInConstraints = 0;

    for (let i = 0; i < constraints.length; i++) {
        let constraint = constraints[i];
        numberOfFeaturesReferencedInConstraints += await countNumberOfFeaturesInAConstraint(constraint.value);
    }

    return numberOfFeaturesReferencedInConstraints;
}

countNumberOfFeaturesInAConstraint = async (constraint) => {
    let numberOfFeaturesInAConstraint = 0;

    let start = constraint.indexOf('_');
    let index = start;

    while (index !== -1 && index === start) {
        index = constraint.indexOf(' ');

        if (index === -1) {
            numberOfFeaturesInAConstraint += 1;
        } else if (index > start) {
            numberOfFeaturesInAConstraint += 1 + await countNumberOfFeaturesInAConstraint(constraint.substring(index + 1, constraint.length));
        } else {
            numberOfFeaturesInAConstraint += await countNumberOfFeaturesInAConstraint(constraint.substring(index + 1, constraint.length));
        }
    }

    return numberOfFeaturesInAConstraint;
}
