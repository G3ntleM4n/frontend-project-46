import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parserJson, parserYml } from '../src/parsers.js';
import findDiff from '../src/flatCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const object1 = parserJson(getFixturePath('testFlat1.json'));
const object2 = parserJson(getFixturePath('testFlat2.json'));
const object3 = parserYml(getFixturePath('testFlat3.yml'));
const object4 = parserYml(getFixturePath('testFlat4.yaml'));
let diff;
let diffSame1;
let diffSame2;

beforeAll(() => {
  diff = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  diffSame1 = {
    '  follow': false,
    '  host': 'hexlet.io',
    '  proxy': '123.234.53.22',
    '  timeout': 50,
  };
  diffSame2 = {
    '  host': 'hexlet.io',
    '  timeout': 20,
    '  verbose': true,
  };
});

test('flat differences test', () => {
  expect(findDiff(object1, object2)).toStrictEqual(diff);
  expect(findDiff(object3, object4)).toStrictEqual(diff);
  expect(findDiff(object1, object3)).toStrictEqual(diffSame1);
  expect(findDiff(object2, object4)).toStrictEqual(diffSame2);
});
