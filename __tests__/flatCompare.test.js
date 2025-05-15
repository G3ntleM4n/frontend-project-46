import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parserJson from '../src/parser.js';
import findDiff from '../src/flatCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let object1;
let object2;
let filepath1;
let filepath2;
let result;

beforeAll(() => {
  filepath1 = getFixturePath('testFile1.json');
  filepath2 = getFixturePath('testFile2.json');

  [object1, object2] = parserJson(filepath1, filepath2);
  result = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
});

test('diffTest', () => {
  expect(findDiff(object1, object2)).toStrictEqual(result);
});
