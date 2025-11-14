const stylishOutput = (object, spacesCount = 2, prefix = ' ') => {
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

export default stylishOutput;
