const numberOfFeatures = require('./numberOfFeatures');
const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');
const numberOfGroupedFeatures = require('./numberOfGroupedFeatures');
const numberOfMandatoryFeatures = require('./numberOfMandatoryFeatures');
const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');
const cognitiveComplexity = require('./cognitiveComplexity');
const flexibilityOfConfiguration = require('./flexibilityOfConfiguration');
const ratioOfVariability = require('./ratioOfVariability');
const multipleCyclicDependentFeatures = require('./multipleCyclicDependentFeatures');
const numberOfNotLeafFeatures = require('./numberOfNotLeafFeatures');
const numberOfCrossTreeConstraints = require('./numberOfCrossTreeConstraints');
const crossTreeConstraintsRatio = require('./crossTreeConstraintsRatio');
const cyclomaticComplexityOfFeatureModels = require('./cyclomaticComplexityOfFeatureModels');
const branchingFactor = require('./branchingFactor');

//Qnd alternar features, ver nLeaf
const featureModel = require('./mobilePhoneFeatureTree');
// const featureModel = require('./featureTree');

teste = async () => {
    let nOr = await numberGroupesOr.numberGroupesOr(featureModel.feature_tree[0]);
    let nXor = await numberGroupesXor.numberGroupesXor(featureModel.feature_tree[0]);
    let nOF = await numberOfFeatures.numberOfFeatures(featureModel.feature_tree[0]) + 1;
    let nO = await numberOfOptionalFeatures.numberOfOptionalFeatures(featureModel.feature_tree[0]);
    let cogC = await cognitiveComplexity.cognitiveComplexity(nOr, nXor);
    // let nLeaf = 37;
    let nLeaf = 7; //to mobilePhoneFeatureTree
    let nFri = await numberOfCrossTreeConstraints.numberOfCrossTreeConstraints(featureModel);

    console.log('NoF:         ', nOF);
    console.log('NGOr:        ', nOr);
    console.log('NGXOr:       ', nXor);
    console.log('Nº Or + Xor: ', await numberOfGroupedFeatures.numberOfGroupedFeatures(featureModel.feature_tree[0]));
    console.log('NM:          ', await numberOfMandatoryFeatures.numberOfMandatoryFeatures(featureModel.feature_tree[0]));
    console.log('NO:          ', nO);
    console.log('CogC:        ', cogC);
    console.log('FoC:         ', await flexibilityOfConfiguration.flexibilityOfConfiguration(nO, nOF));
    console.log('RoV:         ', await ratioOfVariability.ratioOfVariability(cogC, nOF, nLeaf));
    console.log('MCDF:        ', await multipleCyclicDependentFeatures.multipleCyclicDependentFeatures(featureModel));
    console.log('NGF:         ', await numberOfNotLeafFeatures.numberOfNotLeafFeatures(nOF, nLeaf));
    console.log('NFRI:        ', nFri);
    console.log('CTCR:        ', await crossTreeConstraintsRatio.crossTreeConstraintsRatio(nFri, nOF))
    console.log('CyC:         ', await cyclomaticComplexityOfFeatureModels.cyclomaticComplexityOfFeatureModels(featureModel));
    console.log('BF:          ', await branchingFactor.branchingFactor(featureModel.feature_tree[0]));
}

teste();