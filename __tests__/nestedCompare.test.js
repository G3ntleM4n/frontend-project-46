/* eslint-disable quote-props */
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parserJson, parserYml } from '../src/parsers.js';
import findDiffNested from '../src/nestedCompare.js';

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

beforeAll(() => {
  filepath1 = getFixturePath('testNested1.json');
  filepath2 = getFixturePath('testNested2.json');
  filepath3 = getFixturePath('testNested3.yml');
  filepath4 = getFixturePath('testNested4.yaml');

  object1 = parserJson(filepath1);
  object2 = parserJson(filepath2);
  object3 = parserYml(filepath3);
  object4 = parserYml(filepath4);
  diff = {
    '  common': {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        'key5': 'value5',
      },
      '  setting6': {
        '  doge': {
          '- wow': '',
          '+ wow': 'so much',
        },
        '  key': 'value',
        '+ ops': 'vops',
      },
    },
    '  group1': {
      '- baz': 'bas',
      '+ baz': 'bars',
      '  foo': 'bar',
      '- nest': {
        'key': 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      'abc': 12345,
      'deep': {
        'id': 45,
      },
    },
    '+ group3': {
      'deep': {
        'id': {
          'number': 45,
        },
      },
      'fee': 100500,
    },
  };
});

test('nested differences test', () => {
  expect(findDiffNested(object1, object2)).toStrictEqual(diff);
  expect(findDiffNested(object3, object4)).toStrictEqual(diff);
  // expect(findDiff(object1, object3)).toStrictEqual(diffSame1);
  // expect(findDiff(object2, object4)).toStrictEqual(diffSame2);
});
