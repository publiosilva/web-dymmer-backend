const numberOfContexts = require('./numberOfContexts');

exports.execute = async (featureModel) => {
    let contexts = featureModel.contexts;
    let numberOfDeactivatedFeatures = await countNumberOfDeactivatedFeatures(contexts);

    return numberOfDeactivatedFeatures / await numberOfContexts.execute(featureModel);
};

const countNumberOfDeactivatedFeatures = async (contexts) => {
    let numberOfDeactivatedFeatures = 0;

    for (let i = 0; i < contexts.length; i++) {
        let context = contexts[i];

        for (let j = 0; j < context.resolutions.length; j++) {
            let resolution = context.resolutions[j];

            if (resolution.status === true) {
                numberOfDeactivatedFeatures++;
            }
        }
    }

    return numberOfDeactivatedFeatures;
}
