import _ from 'lodash';

const findDiffNested = (data1, data2) => {
  const iter = (d1, d2) => {
    const diff = {};
    const keys = _.sortBy(_.union(Object.keys(d1), Object.keys(d2)));

    /* console.log('keys: ', keys);
    console.log('\n\n\n'); */

    keys.map((key) => {
      if (!Object.hasOwn(d1, key)) {
        diff[`+ ${key}`] = d2[key];
      } else if (!Object.hasOwn(d2, key)) {
        diff[`- ${key}`] = d1[key];
      } else if (d1[key] !== d2[key]) {
        if (typeof d1[key] === 'object' && typeof d2[key] === 'object') {
          diff[`  ${key}`] = iter(d1[key], d2[key]);
        } else {
          diff[`- ${key}`] = d1[key];
          diff[`+ ${key}`] = d2[key];
        }
      } else {
        diff[`  ${key}`] = d1[key];
      }
      // console.log('this level diff: ', diff);
      return diff;
    });
    return diff;
  };
  const globalDiff = iter(data1, data2);
  console.log(globalDiff);
  return globalDiff;
};

export default findDiffNested;
