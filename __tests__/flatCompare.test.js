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
let diff;
let diffSame1;
let diffSame2;

beforeAll(() => {
  filepath1 = getFixturePath('flat1.json');
  filepath2 = getFixturePath('flat2.json');
  filepath3 = getFixturePath('flat3.yml');
  filepath4 = getFixturePath('flat4.yaml');

  object1 = parserJson(filepath1);
  object2 = parserJson(filepath2);
  object3 = parserYml(filepath3);
  object4 = parserYml(filepath4);
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
