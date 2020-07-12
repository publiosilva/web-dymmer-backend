function convertFeatureTreeToFMO(featureTree, parent) {
  let FMOFacts = [];

  if (featureTree.type === 'r') {
    FMOFacts.push(`feature(ftr${featureTree.id},m).`);
  } else if (featureTree.type === 'm' || featureTree.type === 'o') {
    FMOFacts.push(`feature(ftr${featureTree.id},${featureTree.type}).`);
  } else if (featureTree.type === 'g') {
    FMOFacts.push(
      `card(ftr${parent.id},[${featureTree.children
        .map((element) => `ftr${element.id}`)
        .join(',')}],[${featureTree.multiplicity}]).`
    );
  }

  for (let i = 0; i < featureTree.children.length; i += 1) {
    const element = featureTree.children[i];

    if (parent) {
      if (featureTree.type !== 'g') {
        FMOFacts.push(`parent(ftr${parent.id},ftr${featureTree.id}).`);
      } else {
        FMOFacts.push(`parent(ftr${parent.id},ftr${element.id}).`);
      }
    }

    if (featureTree.type === 'g') {
      FMOFacts = FMOFacts.concat(
        convertFeatureTreeToFMO(element, { id: parent.id, type: parent.type })
      );
    } else {
      FMOFacts = FMOFacts.concat(
        convertFeatureTreeToFMO(element, {
          id: featureTree.id,
          type: featureTree.type,
        })
      );
    }
  }

  return FMOFacts.sort();
}

function convertConstraintsToFMO(constraints) {
  const FMOFacts = [];

  for (let i = 0; i < constraints.length; i += 1) {
    const element = constraints[i];

    const [left, right] = element.value.split(' => ');

    if (right.includes('~')) {
      FMOFacts.push(`relation(ftr${left},ftr${right.replace('~', '')},excl).`);
    } else {
      FMOFacts.push(`relation(ftr${left},ftr${right},impl).`);
    }
  }

  return FMOFacts;
}

export default function convertFeatureModelToFMO(featureModel) {
  const [featureTree] = featureModel.feature_tree;
  const { constraints } = featureModel;

  return convertFeatureTreeToFMO(featureTree, null).concat(
    convertConstraintsToFMO(constraints)
  );
}
