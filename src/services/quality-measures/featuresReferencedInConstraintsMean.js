exports.featuresReferencedInConstraintsMean = async (featureModel) => {
    let constraints = featureModel.constraints;

    if (constraints.length !== 0) {
        return countNumberOfFeaturesReferencedInConstraints(constraints);
    }

    return 0;
}

countNumberOfFeaturesReferencedInConstraints = (constraints) => {
    let numberOfFeaturesReferencedInConstraints = 0;

    constraints.forEach(constraint => {
        numberOfFeaturesReferencedInConstraints += countNumberOfFeaturesInAConstraint(constraint.value);
    });

    return numberOfFeaturesReferencedInConstraints;
}

countNumberOfFeaturesInAConstraint = (constraint) => {
    let numberOfFeaturesInAConstraint = 0;

    let start = constraint.indexOf('_');
    let index = start;
    
    while (index !== -1 && index === start) {
        index = constraint.indexOf(' ');
        
        if (index === -1) {
            numberOfFeaturesInAConstraint += 1;
        } else if (index > start) {
            numberOfFeaturesInAConstraint += 1 + countNumberOfFeaturesInAConstraint(constraint.substring(index + 1, constraint.length));
        } else {
            numberOfFeaturesInAConstraint += countNumberOfFeaturesInAConstraint(constraint.substring(index + 1, constraint.length));
        }
    }

    return numberOfFeaturesInAConstraint;
}