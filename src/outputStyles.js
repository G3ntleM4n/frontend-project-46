/* eslint-disable no-param-reassign */
export const stylishOutput = (object, spacesCount = 2, prefix = ' ') => {
  let result = '{\n';
  const iter = (node, depth) => {
    let diff = '';
    Object.entries(node).forEach(([key, value]) => {
      if (key.search(/^(\+|-| )/) !== -1) { // if key starts with '+' or '-' or space
        if (typeof value === 'object' && value !== null) {
          const dive = iter(value, depth + 2);
          diff += `${prefix.repeat(spacesCount * depth)}${key}: {\n`;
          diff += dive;
          diff += `${prefix.repeat(spacesCount * depth)}  }\n`;
        } else {
          diff += `${prefix.repeat(spacesCount * depth)}${key}: ${value}\n`;
        }
        return diff;
      }
      if (typeof value === 'object' && value !== null) {
        const dive = iter(value, depth + 2);
        diff += `${prefix.repeat(spacesCount * depth)}  ${key}: {\n`;
        diff += dive;
        diff += `${prefix.repeat(spacesCount * depth)}  }\n`;
      } else {
        diff += `${prefix.repeat(spacesCount * depth)}  ${key}: ${value}\n`;
      }
      return diff;
    });

    return diff;
  };

  result += iter(object, 1);
  result += '}';
  // console.log(result);
  return result;
};

const makePath = (path, endpoint) => (path !== '' ? `${path}.${endpoint}` : `${endpoint}`);

export const plainOutput = (object) => {
  let result = '';

  const iter = (obj, path = '') => {
    Object.entries(obj).reduce((acc, [key, value]) => {
      const endpoint = makePath(path, key.slice(2));

      if (key.startsWith(' ')) {
        if (acc.length > 0 && acc[0].startsWith('-')) {
          result += `Property '${acc[2]}' was removed\n`;
          acc = [];
        }
        if (typeof value !== 'object') {
          return [];
        }
        iter(value, endpoint);
      }

      switch (typeof value) {
        case 'string':
          value = `'${value}'`;
          break;
        case 'object':
          if (value !== null) {
            value = '[complex value]';
            break;
          }
          break;
        default:
          break;
      }

      if (key.startsWith('-')) {
        if (acc.length > 0 && acc[0].startsWith('-')) {
          result += `Property '${acc[2]}' was removed\n`;
          acc = [key, value, endpoint];
          return acc;
        }
        acc = [key, value, endpoint];
        return acc;
      }

      if (key.startsWith('+')) {
        if (acc.length > 0 && acc[0].startsWith('-')) {
          if (acc[0].slice(2) === key.slice(2)) {
            result += `Property '${endpoint}' was updated. From ${acc[1]} to ${value}\n`;
            return [];
          }
          result += `Property '${acc[2]}' was removed\n`;
        }
        if (typeof value === 'object' && value !== null) {
          result += `Property '${endpoint}' was added with value: ${value}\n`;
          return [];
        }
        result += `Property '${endpoint}' was added with value: ${value}\n`;
        return [];
      }

      return [];
    }, []);
  };

  iter(object);
  return result.trim();
};
