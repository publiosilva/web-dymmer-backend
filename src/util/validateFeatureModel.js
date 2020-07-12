import tauProlog from 'tau-prolog';
import convertFeatureModelToFMO from './convertFeatureModelToFMO';

const inconsistencies = {
  i1: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(1) \nExplanation: impl and excl relation between ${featureA} and ${featureB}`;
  },
  i2: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(2)\nExplanation: excl relation between ${featureA} and ${featureB}`;
  },
  i3: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(3)\n Explanation: excl relation between ${featureA} and ${featureB}`;
  },
  i4: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(4)\n Explanation: excl relation between ${featureA} and ${featureB}`;
  },
  i5: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(5)\n Explanation: excl relation between ${featureA} and ${featureB}`;
  },
  i6: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(6)\nExplanation: excl relation between ${featureA} and ${featureB}`;
  },
  i7: (features) => {
    const [featureA, featureB, featureC, featureD] = features;

    return `Defect: Inconsistency(7)\nExplanation: impl relation between ${featureA} and ${featureB} and excl relation between ${featureC} and ${featureD}`;
  },
  i8: (features) => {
    const [featureA, featureB, featureC] = features;

    return `Defect: Inconsistency(8)\nExplanation: impl relation between ${featureA} and ${featureB} and excl relation between ${featureC} and ${featureB}`;
  },
  i9: (features) => {
    const [featureA, featureB] = features;

    return `Defect: Inconsistency(9)\nExplanation: impl relation between ${featureA} and ${featureB}`;
  },
};

const FMORules = [
  "inconsistent1(i1, F_1, F_2) :- feature(F_1,m), feature(F_2,m), relation(F_1,F_2,impl), relation(F_2, F_1, excl), write('\nDefect: Inconsistency(1) \nExplanation: impl and excl relation between '), write(F_1), write(' and '), write(F_2), write('\n').",
  "inconsistent2(i2, F_1, F_2) :- feature(F_1,m), feature(F_2,m), relation(F_1,F_2,excl), write('\nDefect: Inconsistency(2)\nExplanation: excl relation between '), write(F_1), write(' and '), write(F_2), write('\n').",
  "inconsistent3(i3, F_2, F_3) :- feature(F_1,m), feature(F_2,m), feature(F_3,m), parent(F_3,F_1), parent(F_1,P), parent(F_2,P), relation(F_2,F_3,excl), write('Defect: Inconsistency(3)\n Explanation: excl relation between '), write(F_2), write(' and '), write(F_3), write('\n').",
  "inconsistent4(i4, F_3, F_4) :- feature(F_1,m), feature(F_2,m), feature(F_3,m), feature(F_4,m), parent(F_3,F_1), parent(F_4,F_2), relation(F_3,F_4, excl), write('\nDefect: Inconsistency(4)\n Explanation: excl relation between '), write(F_3), write(' and '), write(F_4), write('\n').",
  "inconsistent5(i5, F_3, F_2) :- feature(P,m), feature(F_1,o), feature(F_2,m), feature(F_3,m), parent(F_1, P), parent(F_2,P), parent(F_3,F_1), relation(F_3,F_2,excl), write('Defect: Inconsistency(5)\n Explanation: excl relation between '), write(F_3), write(' and '), write(F_2), write('\n').",
  "inconsistent6(i6, F_3, F_4) :- feature(F_1,o), feature(F_2,m), feature(F_3,m), feature(F_4,m), parent(F_3, F_1), parent(F_4,F_2), relation(F_3,F_4, excl), write('\nDefect: Inconsistency(6)\nExplanation: excl relation between '), write(F_3), write(' and'), write(F_4), write('\n').",
  "inconsistent7(i7, F_1, F_2, F_3, F_4) :- feature(F_1,m), feature(F_2,o), feature(F_3,m), feature(F_4,m), parent(F_3, F_1), parent(F_4,F_2), relation(F_3,F_4, excl), relation(F_1,F_2,impl), write('\nDefect: Inconsistency(7)\nExplanation: impl relation between '), write(F_1), write(' and '), write(F_2), write('\nand excl relation between '), write(F_3), write(' and '), write(F_4), write('\n').",
  "inconsistent8(i8, F_1, F_2, F_3) :- feature(F_1,m), feature(F_2,o), feature(F_3,m), parent(F_3,F_1), relation(F_1,F_2,impl), relation(F_3,F_2,excl), write('\nDefect: Inconsistency(8)\nExplanation: impl relation between '), write(F_1), write(' and '), write(F_2), write('\nand excl relation between '), write(F_3), write(' and '), write(F_2), write('\n').",
  "inconsistent9(i9, F_2, F_3) :- feature(F_1,m), feature(F_2,m), feature(F_3,m), card(F_1,[F_2,F_3],[1,1]), relation(F_2,F_3,impl), write('\nDefect: Inconsistency(9)\nExplanation: impl relation between '), write(F_2), write(' and '), write(F_3), write('\n').",
];

const queries = [
  'inconsistent1(I, F_A, F_B).',
  'inconsistent2(I, F_A, F_B).',
  'inconsistent3(I, F_A, F_B).',
  'inconsistent4(I, F_A, F_B).',
  'inconsistent5(I, F_A, F_B).',
  'inconsistent6(I, F_A, F_B).',
  'inconsistent7(I, F_A, F_B, F_C, F_D).',
  'inconsistent8(I, F_A, F_B, F_C).',
  'inconsistent9(I, F_A, F_B).',
];

export default function validadeFeatureModel(featureModel) {
  const session = tauProlog.create(1000);
  const FMOFacts = convertFeatureModelToFMO(featureModel);
  const FMO = FMOFacts.concat(FMORules);
  const answers = [];

  session.consult(`${FMO.join('')}`);

  queries.forEach((query) => {
    session.query(`${query}`);
    session.answers((answer) => {
      if (answer && answer.links) {
        const [inconsistencyKey, ...features] = Object.entries(
          answer.links
        ).map(([, value]) => value.id);
        const inconsistency = inconsistencies[inconsistencyKey];

        answers.push(inconsistency(features));
      }
    });
  });

  return answers;
}
