/**
 * Cyclomatic complexity of feature models (CC)
 * This metric should count the number of distinct
 * cycles in a feature model. They count the number of these constraints.
 */

exports.cyclomaticComplexityOfFeatureModels = (featureModel) => {
    return featureModel.constraints.length;
}