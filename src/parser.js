import * as fs from 'node:fs';

const parserJson = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(filepath1, { encoding: 'utf-8' });
  const file2 = fs.readFileSync(filepath2, { encoding: 'utf-8' });
  return [JSON.parse(file1), JSON.parse(file2)];
};
export default parserJson;
