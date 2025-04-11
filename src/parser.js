import * as fs from 'node:fs';

const parserJson = (filepath1, filepath2) => {
  try {
    const file1 = fs.readFileSync(filepath1, { encoding: 'utf-8' });
    const file2 = fs.readFileSync(filepath2, { encoding: 'utf-8' });
    // console.log(JSON.parse(file1));
    // console.log(JSON.parse(file2));
    return [JSON.parse(file1), JSON.parse(file2)];
  } catch (error) {
    console.log('\nERROR: one of the files can\'t be parsed\n');
    return 0;
  }
};
export default parserJson;
