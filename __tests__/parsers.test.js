import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parserJson, parserYml } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let parsedFirst;
let parsedSecond;
const filepath1 = getFixturePath('testFlat1.json');
const filepath2 = getFixturePath('testFlat2.json');
const filepath3 = getFixturePath('testFlat3.yml');
const filepath4 = getFixturePath('testFlat4.yaml');

beforeAll(() => {
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
