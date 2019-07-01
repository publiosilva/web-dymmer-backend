exports.execute = async (featureModel) => {
    let contexts = featureModel.contexts;
    let currentContext = await getCurrentContext(contexts);

    if (currentContext === null) {
        return 0;
    }

    return currentContext.constraints.length;
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
