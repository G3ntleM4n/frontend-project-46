import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import stylishOutput from '../src/outputStyles.js';
import { parserJson, parserYml } from '../src/parsers.js';
import findDiffFlat from '../src/flatCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let object1;
let object2;
let object3;
let object4;
let filepath1;
let filepath2;
let filepath3;
let filepath4;
let expected;

beforeAll(() => {
  filepath1 = getFixturePath('testFlat1.json');
  filepath2 = getFixturePath('testFlat2.json');
  filepath3 = getFixturePath('testFlat3.yml');
  filepath4 = getFixturePath('testFlat4.yaml');

  object1 = parserJson(filepath1);
  object2 = parserJson(filepath2);
  object3 = parserYml(filepath3);
  object4 = parserYml(filepath4);

  expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
});

test('stylish output test', () => {
  expect(stylishOutput(findDiffFlat(object1, object2))).toStrictEqual(expected);
  expect(stylishOutput(findDiffFlat(object3, object4))).toStrictEqual(expected);
});
