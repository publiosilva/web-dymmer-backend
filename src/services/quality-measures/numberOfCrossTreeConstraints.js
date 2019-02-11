/**
 * Number of distinct features involved in cross-tree constraints (NFRI)
 */

exports.numberOfCrossTreeConstraints = featureModel => {
  let constraints = featureModel.constraints;

  let conKeys;
  let conFeatures = [];

  constraints.forEach(element => {
    conKeys = Object.values(element)[0]
      .replace(/[\s\W-]+/g, "")
      .split("or");
    conKeys.forEach(feature => {
      conFeatures.push(feature);
    });
  });

  // remove duplicate items
  conFeatures = conFeatures.filter((elem, i) => {
    return conFeatures.indexOf(elem) === i;
  });

  return conFeatures.length;
};
