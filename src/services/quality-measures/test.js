const numberOfFeatures = require('./numberOfFeatures');
const numberGroupesOr = require('./numberGroupesOr');
const numberGroupesXor = require('./numberGroupesXor');
const numberOfGroupedFeatures = require('./numberOfGroupedFeatures');
const numberOfMandatoryFeatures = require('./numberOfMandatoryFeatures');
const numberOfOptionalFeatures = require('./numberOfOptionalFeatures');
const cognitiveComplexity = require('./cognitiveComplexity');
const numberOfLeafFeatures = require('./numberOfLeafFeatures');
const flexibilityOfConfiguration = require('./flexibilityOfConfiguration');
const ratioOfVariability = require('./ratioOfVariability');
const multipleCyclicDependentFeatures = require('./multipleCyclicDependentFeatures');
const numberOfGroupingFeatures = require('./numberOfGroupingFeatures');
const numberOfCrossTreeConstraints = require('./numberOfCrossTreeConstraints');
const crossTreeConstraintsRatio = require('./crossTreeConstraintsRatio');
const cyclomaticComplexityOfFeatureModels = require('./cyclomaticComplexityOfFeatureModels');
const branchingFactorMax = require('./branchingFactorMax');
const depthOfTreeMean = require('./depthOfTreeMean');
const depthOfTreeMedian = require('./depthOfTreeMedian');
const crossTreeConstraintsVariable = require('./crossTreeConstraintsVariable');

// const featureModel = require('./mobilePhoneFeatureTree');
const featureModel = require('./featureTree');

teste = async () => {
    let nOr = await numberGroupesOr.numberGroupesOr(featureModel.feature_tree[0]);
    let nXor = await numberGroupesXor.numberGroupesXor(featureModel.feature_tree[0]);
    let nOF = await numberOfFeatures.numberOfFeatures(featureModel.feature_tree[0]) + 1;
    let nO = await numberOfOptionalFeatures.numberOfOptionalFeatures(featureModel.feature_tree[0]);
    let cogC = await cognitiveComplexity.cognitiveComplexity(nOr, nXor);
    let nLeaf = numberOfLeafFeatures.numberOfLeafFeatures(featureModel);
    let nFri = await numberOfCrossTreeConstraints.numberOfCrossTreeConstraints(featureModel);
    let dtMean = await depthOfTreeMean.depthOfTreeMean(featureModel.feature_tree[0]);
    let dtMedian = await depthOfTreeMedian.depthOfTreeMedian(featureModel.feature_tree[0]);
    let cTCV = await crossTreeConstraintsVariable.crossTreeConstraintsVariable(featureModel);

    console.log('NoF:         ', nOF);
    console.log('NGOr:        ', nOr);
    console.log('NGXOr:       ', nXor);
    console.log('Nº Or + Xor: ', await numberOfGroupedFeatures.numberOfGroupedFeatures(featureModel.feature_tree[0]));
    console.log('NM:          ', await numberOfMandatoryFeatures.numberOfMandatoryFeatures(featureModel.feature_tree[0]));
    console.log('NO:          ', nO);
    console.log('NLeaf:       ', nLeaf);
    console.log('CogC:        ', cogC);
    console.log('FoC:         ', await flexibilityOfConfiguration.flexibilityOfConfiguration(nO, nOF));
    console.log('RoV:         ', await ratioOfVariability.ratioOfVariability(cogC, nOF, nLeaf));
    console.log('MCDF:        ', await multipleCyclicDependentFeatures.multipleCyclicDependentFeatures(featureModel));
    console.log('NGF:         ', await numberOfGroupingFeatures.numberOfGroupingFeatures(nOF, nLeaf));
    console.log('NFRI:        ', nFri);
    console.log('CTCR:        ', await crossTreeConstraintsRatio.crossTreeConstraintsRatio(nFri, nOF))
    console.log('CyC:         ', await cyclomaticComplexityOfFeatureModels.cyclomaticComplexityOfFeatureModels(featureModel));
    console.log('BF Max:      ', await branchingFactorMax.branchingFactorMax(featureModel.feature_tree[0]));
    console.log('DT Mean:     ', dtMean);
    console.log('DT Median:   ', dtMedian);
    console.log('CTCV:        ', cTCV);
}

teste();