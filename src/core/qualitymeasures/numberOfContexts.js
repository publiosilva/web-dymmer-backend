exports.execute = async (featureModel) => {
    let contexts = featureModel.contexts;
    
    return contexts.length;
};
