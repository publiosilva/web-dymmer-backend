import group from '../util/arrayUtils';

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function getDatasetPercentages(dataset) {
  return dataset.map((row) => (1.0 / row.length) * 100);
}

function sortDataset(dataset) {
  return dataset.map((row) => row.sort());
}

function groupDataset(dataset) {
  return dataset.map((row) => group(row));
}

function getThreshold(items, individualPercentage, thresholdPercentage) {
  let sum = 0;
  const entries = Object.entries(items);

  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];

    sum += value.length * individualPercentage;

    if (sum >= thresholdPercentage) {
      return key;
    }
  }

  return null;
}

function calculateThresholds(dataset, datasetPercentages) {
  return dataset.map((row, index) => {
    const threholds = {
      veryLow: null,
      low: null,
      moderate: null,
      high: null,
      veryHigh: null,
    };

    const individualPercentage = datasetPercentages[index];

    threholds.veryLow = getThreshold(row, individualPercentage, 0);
    threholds.low = getThreshold(row, individualPercentage, 3);
    threholds.moderate = getThreshold(row, individualPercentage, 15);
    threholds.high = getThreshold(row, individualPercentage, 90);
    threholds.veryHigh = getThreshold(row, individualPercentage, 95);

    return threholds;
  });
}

function deriveThresholdsByValeMethod(dataset) {
  const transposedDataset = transposeMatrix(dataset);

  const datasetPercentages = getDatasetPercentages(transposedDataset);

  const orderedDataset = sortDataset(transposedDataset);

  const groupedDataset = groupDataset(orderedDataset);

  const datasetThresholds = calculateThresholds(
    groupedDataset,
    datasetPercentages
  );

  return datasetThresholds;
}

export default deriveThresholdsByValeMethod;
