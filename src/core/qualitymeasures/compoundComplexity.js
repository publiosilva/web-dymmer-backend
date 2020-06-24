const numberOfFeatures = require("./numberOfFeatures");
const numberOfMandatoryFeatures = require("./numberOfMandatoryFeatures");
const numberOfOrGroups = require("./numberGroupesOr");
const numberOfXorGroups = require("./numberGroupesXor");
const numberOfGroupingFeatures = require("./numberOfGroupingFeatures");
const cyclomaticComplexity = require("./cyclomaticComplexityOfFeatureModels");

exports.execute = async (featureModel) => {
    const NF = await numberOfFeatures.execute(featureModel);
    const NM = await numberOfMandatoryFeatures.execute(featureModel);
    const NOr = await numberOfOrGroups.execute(featureModel);
    const NXOr = await numberOfXorGroups.execute(featureModel);
    const NGF = await numberOfGroupingFeatures.execute(featureModel);
    const CyC = await cyclomaticComplexity.execute(featureModel);

    const R = NGF + CyC;

    const ComC =
        Math.pow(NF, 2) +
        (Math.pow(NM, 2) +
            2 * Math.pow(NOr, 2) +
            3 * Math.pow(NXOr, 2) +
            3 * Math.pow(NGF, 2) +
            3 * Math.pow(R, 2)) /
            9;

    return ComC;
};
