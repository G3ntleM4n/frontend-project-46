import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parserJson from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let parsedJson1;
let parsedJson2;
let filepath1;
let filepath2;
let filepath3;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeEach(() => {
  parsedJson1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  parsedJson2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  filepath1 = getFixturePath('testFile1.json');
  filepath2 = getFixturePath('testFile2.json');
  filepath3 = getFixturePath('testFile3.json');
});

test('parserTest', () => {
  expect(parserJson(filepath1, filepath2)).toEqual([parsedJson1, parsedJson2]);
  expect(() => {
    parserJson(filepath1, filepath3);
  }).toThrow();
});
