exports.run = async (featureModelList, qualityMeasureList) => {
    // step 1
    let qualityMeasureValuesList = await calculateQualityMeasureValues(featureModelList, qualityMeasureList);
    // step 2
    calculateQualityMeasurePercentages(qualityMeasureList, qualityMeasureValuesList);
    // step 3
    sortByQualityMeasurePercentage(qualityMeasureList, qualityMeasureValuesList);
    // step 4
    groupEqualQualityMeasureValues(qualityMeasureList, qualityMeasureValuesList);
    // step 5
    let qualityMeasureThresholds = calculateThresholds(qualityMeasureList, qualityMeasureValuesList);

    return qualityMeasureThresholds;
}

// step 1
const calculateQualityMeasureValues = async (featureModelList, qualityMeasureList) => {
    // init the quality measure values arrays with empty value
    let qualityMeasureValues = {};
    for (let j = 0; j < qualityMeasureList.length; j++) {
        qualityMeasureValues[qualityMeasureList[j].id] = [];
    }

    // for each feature model calculate all quality measures
    for (let i = 0; i < featureModelList.length; i++) {
        let featureModel = JSON.parse(featureModelList[i].featureModelJson);

        for (let j = 0; j < qualityMeasureList.length; j++) {
            let path = '../qualitymeasures/' + qualityMeasureList[j].file;
            let qualityMeasureValue = await require(path).execute(featureModel);
            qualityMeasureValues[qualityMeasureList[j].id].push({ value: qualityMeasureValue });
        }
    }

    return qualityMeasureValues;
}

// step 2
const calculateQualityMeasurePercentages = (qualityMeasureList, qualityMeasureValuesList) => {
    // for each value of each quality measure calculate your percentage
    qualityMeasureList.forEach(qualityMeasure => {
        let qualityMeasureValues = qualityMeasureValuesList[qualityMeasure.id];
        let individualPercentage = (1.0 / qualityMeasureValues.length) * 100.0;

        qualityMeasureValues.forEach(qualityMeasureValue => {
            qualityMeasureValue['percentage'] = individualPercentage;
        });
    });
}

// step 3
const sortByQualityMeasurePercentage = (qualityMeasureList, qualityMeasureValuesList) => {
    // sort quality measure values by your percentage
    qualityMeasureList.forEach(qualityMeasure => {
        qualityMeasureValuesList[qualityMeasure.id].sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    });
}

// step 4
const groupEqualQualityMeasureValues = (qualityMeasureList, qualityMeasureValuesList) => {
    // group equal values ​​of each quality measure by adding your percentage
    qualityMeasureList.forEach(qualityMeasure => {
        for (let i = 1; i < qualityMeasureValuesList[qualityMeasure.id].length; i++) {
            let previus = qualityMeasureValuesList[qualityMeasure.id][i - 1];
            let current = qualityMeasureValuesList[qualityMeasure.id][i];

            if (previus.value == current.value) {
                previus.percentage += current.percentage;
                qualityMeasureValuesList[qualityMeasure.id].splice(i, 1);
                i--;
            }
        }
    });
}

const calculateThresholds = (qualityMeasureList, qualityMeasuresValuesList) => {
    let qualityMeasureThresholdList = [];

    qualityMeasureList.forEach(qualityMeasure => {
        let qualityMeasureThreshold = {
            qualityMeasure: qualityMeasure.id,
            veryLow: null,
            low: null,
            moderate: null,
            high: null,
            veryHigh: null,
        };

        // very low
        qualityMeasureThreshold.veryLow = getTheFirstValueAfterAPercentage(qualityMeasuresValuesList[qualityMeasure.id], 0);
        // low
        qualityMeasureThreshold.low = getTheFirstValueAfterAPercentage(qualityMeasuresValuesList[qualityMeasure.id], 3);
        // moderate
        qualityMeasureThreshold.moderate = getTheFirstValueAfterAPercentage(qualityMeasuresValuesList[qualityMeasure.id], 15);
        // high
        qualityMeasureThreshold.high = getTheFirstValueAfterAPercentage(qualityMeasuresValuesList[qualityMeasure.id], 90);
        // very high
        qualityMeasureThreshold.veryHigh = getTheFirstValueAfterAPercentage(qualityMeasuresValuesList[qualityMeasure.id], 95);

        qualityMeasureThresholdList.push(qualityMeasureThreshold);
    });

    return qualityMeasureThresholdList;
}

const getTheFirstValueAfterAPercentage = (qualityMeasureValuesList, percentage) => {
    let sum = 0;

    // return the first quality measure value after sum >= percentage
    for (let i = 0; i < qualityMeasureValuesList.length; i++) {
        let element = qualityMeasureValuesList[i];
        sum += element.percentage;

        if (sum >= percentage) {
            return element.value;
        }
    }
}
