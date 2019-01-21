/**
 * Flexibility of configuration (FoC)
 * This metric calculates the ratio of the number of optional features over all available features.
 * FoC = NO / NF
 * NO => Number of optional features
 * NF => Number of features
 */

exports.flexibilityOfConfiguration = (nO, nF) => {
 return nO / nF;
}