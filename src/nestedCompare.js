import _ from 'lodash';

const findKeys = (data) => {
  const entries = Object.entries(data);
  const keys = entries.map((entry) => {
    const iter = ([key, value], acc) => {
      acc.push(key);

      if (!_.isObject(value)) {
        return acc;
      }

      Object.entries(value).map((child) => iter(child, acc));

      return acc;
    };
    return iter(entry, []);
  });

  return keys;
};

const pathJoin = (path, toJoin) => {
  const joinedPath = `${path}.${toJoin}`;
  return joinedPath;
};

const findDiffNested = (data1, data2) => {
  const keys = _.union(findKeys(data1), findKeys(data2));
  const firstKeys = _.union(Object.keys(data1), Object.keys(data2));
  const allData = _.merge(_.cloneDeep(data1), _.cloneDeep(data2));
  console.log(allData);
  console.log('\n\n\n');

  const diff = {};
  const diff2 = {};

  firstKeys.map((key) => {
    const iter = (entryKey, path = entryKey) => {
      const value1 = _.get(data1, path);
      const value2 = _.get(data2, path);
      const allValue = _.get(allData, path);
      /* console.log(path);
      console.log(allValue);
      console.log('\n\n\n'); */

      if (!_.isObject(value1) || !_.isObject(value2)) {
        // Если значение ключа - объект и при этом у одного из файлов не было
        // этого ключа, то просто добавляем ключ со значением и не углубляемся
        if (_.isObject(value2)) {
          diff[`+ ${entryKey}`] = value2;
        } else if (_.isObject(value1)) {
          diff[`- ${entryKey}`] = value1;
        }
        if (!Object.hasOwn(data1, key)) {
          diff[`+ ${entryKey}`] = value2;
        } else if (!Object.hasOwn(data2, key)) {
          diff[`- ${entryKey}`] = value1;
        } else if (value1 !== value2) {
          diff[`- ${entryKey}`] = value1;
          diff[`+ ${entryKey}`] = value2;
        } else {
          diff[`  ${entryKey}`] = value1;
        }
      } else if (_.isObject(value1) && _.isObject(value2)) {
        diff[`  ${entryKey}`] = '';
        Object.keys(allValue).map((keyN) => iter(keyN, pathJoin(path, keyN)));
        // Object.keys(diff2).forEach((keyDiff2) => delete diff2[keyDiff2]);
      }

      // return diff;
    };

    iter(key);
  });

  const finDiff = {};

  const makeFinDiff = (object) => Object.entries(object).map(([key, value]) => {
    if (value !== undefined) {
      finDiff[key] = value;
    }
  });

  makeFinDiff(diff);

  console.log(finDiff);
  return finDiff;

  /*
  const iter = (node1, node2, depth) => {
    // console.log(depth);
    const [key1, value1] = Object.entries(node1)[depth];
    const [key2, value2] = Object.entries(node2)[depth];

    if (!Object.hasOwn(node1, key2)) {
      diff[`+ ${key2}`] = value2;
    } else if (!Object.hasOwn(node2, key1)) {
      diff[`- ${key1}`] = value1;
    } else if (value1 !== value2) {
      diff[`- ${key1}`] = value1;
      diff[`+ ${key2}`] = value2;
    } else {
      diff[`  ${key2}`] = value2;
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      iter(value1, value2, depth + 1);
    }

    // console.log(diff);
    return diff;
  };

  // console.log(diff);
  return iter(data1, data2, 0);
  */
};
export default findDiffNested;
