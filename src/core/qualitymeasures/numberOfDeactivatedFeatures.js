exports.execute = async (featureModel) => {
    let contexts = featureModel.contexts;
    let currentContext = await getCurrentContext(contexts);

    if (currentContext === null) {
        return 0;
    }

    return await countNumberOfDeactivatedFeatures(currentContext);
};

const getCurrentContext = async (contexts) => {
    for (let i = 0; i < contexts.length; i++) {
        let element = contexts[i];

        if (element.isTheCurrent) {
            return element;
        }
    }

    return null;
}

const countNumberOfDeactivatedFeatures = async (context) => {
    let numberOfDeactivatedFeatures = 0;

    for (let i = 0; i < context.resolutions.length; i++) {
        let element = context.resolutions[i];

        if (element.status === false) {
            numberOfDeactivatedFeatures++;
        }
    }

    return numberOfDeactivatedFeatures;
}
