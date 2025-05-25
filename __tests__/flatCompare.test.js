import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parserJson, parserYml } from '../src/parsers.js';
import findDiff from '../src/flatCompare.js';

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
let result;
let diffFirst;
let diffSecond;

beforeAll(() => {
  filepath1 = getFixturePath('testFile1.json');
  filepath2 = getFixturePath('testFile2.json');
  filepath3 = getFixturePath('testYaml1.yml');
  filepath4 = getFixturePath('testYaml2.yaml');

  object1 = parserJson(filepath1);
  object2 = parserJson(filepath2);
  object3 = parserYml(filepath3);
  object4 = parserYml(filepath4);
  result = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  diffFirst = {
    '  follow': false,
    '  host': 'hexlet.io',
    '  proxy': '123.234.53.22',
    '  timeout': 50,
  };
  diffSecond = {
    '  host': 'hexlet.io',
    '  timeout': 20,
    '  verbose': true,
  };
});

test('flat differences test', () => {
  expect(findDiff(object1, object2)).toStrictEqual(result);
  expect(findDiff(object3, object4)).toStrictEqual(result);
  expect(findDiff(object1, object3)).toStrictEqual(diffFirst);
  expect(findDiff(object2, object4)).toStrictEqual(diffSecond);
});
