import _ from 'lodash';
import parserJson from './parser.js';

const genDiff = (data, key, symbol = '') => `${symbol} ${key}: ${data[key]}`.trimStart();

const findDiff = (filepath1, filepath2) => {
  const [data1, data2] = parserJson(filepath1, filepath2);
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const diff = {};
  let keyDiff;
  let dataDiff;
  keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      [keyDiff, dataDiff] = genDiff(data2, key, '+').split(': ');
      diff[keyDiff] = dataDiff;
    } else if (!Object.hasOwn(data2, key)) {
      [keyDiff, dataDiff] = genDiff(data1, key, '-').split(': ');
      diff[keyDiff] = dataDiff;
    } else if (data1[key] !== data2[key]) {
      [keyDiff, dataDiff] = genDiff(data1, key, '-').split(': ');
      diff[keyDiff] = dataDiff;
      [keyDiff, dataDiff] = genDiff(data2, key, '+').split(': ');
      diff[keyDiff] = dataDiff;
    } else {
      [keyDiff, dataDiff] = genDiff(data2, key).split(': ');
      diff[keyDiff] = dataDiff;
    }
    return diff;
  });
  console.log(diff);
};

export default findDiff;
