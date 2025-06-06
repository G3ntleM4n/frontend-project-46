const stylishOutput = (object, prefixNumber = 0, prefix = ' ') => {
  let finalPrefix = '';
  for (let i = 0; i < prefixNumber; i += 1) {
    finalPrefix += prefix;
  }
  console.log('{');
  Object.entries(object).forEach(([key, value]) => {
    console.log(`${finalPrefix}${key}: ${value}`);
  });
  console.log('}');
};

export default stylishOutput;
