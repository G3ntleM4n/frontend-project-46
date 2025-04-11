import findDiff from '../src/findDiff.js';
import parserJson from '../src/parser.js';

const parsedJson1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const parsedJson2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('parserTest', () => {
  expect(parserJson('./files/file1.json', './files/file2.json')).toEqual([parsedJson1, parsedJson2]);
});

const [o1, o2] = parserJson('./files/file1.json', './files/file2.json');

const result = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};

test('diffTest', () => {
  expect(findDiff(o1, o2)).toEqual(result);
});
