import _ from 'lodash';

const findDiffFlat = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  console.log(JSON.stringify(keys, null, 2));

  const diff = {};
  keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      diff[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      diff[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      diff[`- ${key}`] = data1[key];
      diff[`+ ${key}`] = data2[key];
    } else {
      diff[`  ${key}`] = data1[key];
    }

    return diff;
  });

  console.log(diff);
  return diff;
};

export default findDiffFlat;
