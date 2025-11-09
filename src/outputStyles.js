/* import _ from 'lodash';

const styleArray = (array) => `{${array.join('')}\n}`; */

/* const stylishOutput = (target, replacer = ' ', spacesCount = 4) => {
  const arrayOfEntries = Object.entries(target).map((prop) => {
    const iter = (obj, acc, depth = 1) => {
      const [key, value] = obj;
      let string = acc;

      if (!_.isObject(value)) {
        if (key.startsWith('-') || key.startsWith('+') || key.startsWith(' ')) {
          string += `\n${replacer.repeat(spacesCount * depth - 2)}${key}: ${value}`;
        } else {
          string += `\n${replacer.repeat(spacesCount * depth)}${key}: ${value}`;
        }
      }

      if (_.isObject(value)) {
        const nest = Object.entries(value).map((entry) => iter(entry, '', depth + 1));
        if (key.startsWith('-') || key.startsWith('+') || key.startsWith(' ')) {
          string = `\n${replacer.repeat(spacesCount * depth - 2)}${key}: {${nest.join('')}`;
        } else {
          string = `\n${replacer.repeat(spacesCount * depth)}${key}: {${nest.join('')}`;
        }
        string += `\n${replacer.repeat(spacesCount * depth)}}`;
      }

      return string;
    };

    return iter(prop, '');
  });

  const result = styleArray(arrayOfEntries);

  console.log(result);
  return result;
}; */

const stylishOutput = (object, spacesCount = 2, prefix = ' ') => {
  let result = '{\n';
  Object.entries(object).forEach((entry) => {
    const iter = ([key, value], depth = 1) => {
      result += `${prefix.repeat(spacesCount * depth)}${key}: ${value}\n`;
    };

    iter(entry);
  });
  result += '}';
  console.log(result);
  return result;
};

export default stylishOutput;
