import path from 'node:path';
import { parserJson, parserYml } from './parsers.js';
import findDiffNested from './nestedCompare.js';
import { jsonOutput, plainOutput, stylishOutput } from './outputStyles.js';

const genDiff = (filepath1, filepath2, formatter) => {
  let data1;
  let data2;
  let result;
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  if (format1 === '.json') {
    data1 = parserJson(filepath1);
  } else {
    data1 = parserYml(filepath1);
  }

  if (format2 === '.json') {
    data2 = parserJson(filepath2);
  } else {
    data2 = parserYml(filepath2);
  }

  const diff = findDiffNested(data1, data2);
  switch (formatter) {
    case 'plain':
      result = plainOutput(diff);
      break;
    case 'json':
      result = jsonOutput(diff);
      break;
    default:
      result = stylishOutput(diff);
      break;
  }
  return result;
};
export default genDiff;
