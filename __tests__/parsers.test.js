import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parserJson, parserYml } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let parsedFirst;
let parsedSecond;
let filepath1;
let filepath2;
let filepath3;
let filepath4;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeEach(() => {
  parsedFirst = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  parsedSecond = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  filepath1 = getFixturePath('flat1.json');
  filepath2 = getFixturePath('flat2.json');
  filepath3 = getFixturePath('flat3.yml');
  filepath4 = getFixturePath('flat4.yaml');
});

test('parserJsonTest', () => {
  expect(parserJson(filepath1)).toEqual(parsedFirst);
  expect(parserJson(filepath2)).toEqual(parsedSecond);
  expect(() => {
    parserJson(filepath3);
  }).toThrow();
});

test('parserYmlTest', () => {
  expect(parserYml(filepath3)).toEqual(parsedFirst);
  expect(parserYml(filepath4)).toEqual(parsedSecond);
  expect(() => {
    parserYml(filepath1);
  }).toThrow();
});
