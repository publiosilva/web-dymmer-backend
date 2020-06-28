const { getConstraintVariables } = require("../../util/constraintsUtils");

const numberOfFeature = require("./numberOfFeatures");

exports.execute = async (featureModel) => {
    const { constraints } = featureModel;

    const NF = await numberOfFeature.execute(featureModel);

    return numberOfFeaturesThatReferenceOther(constraints) / NF;
};

function numberOfFeaturesThatReferenceOther(constraints) {
    const featuresThatReferenceOther = new Set();

    for (let i = 0; i < constraints.length; i++) {
        let constraint = constraints[i];
        let variables = getConstraintVariables(constraint);

        for (let j = 0; j < variables.length - 1; j++) {
            let variable = variables[j];

            featuresThatReferenceOther.add(variable);
        }
    }

    return featuresThatReferenceOther.size;
}
