import path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { stylishOutput, plainOutput, jsonOutput } from '../src/outputStyles.js'
import { parserJson, parserYml } from '../src/parsers.js'
import findDiffNested from '../src/nestedCompare.js'
import nestedResultJson from '../__fixtures__/nestedResult'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

let object1
let object2
let object3
let object4
let object5
let object6
let object7
let object8

let expected
let expectedNested
let expectedNestedPlain
let expectedNestedJson

let diffFlatJson
let diffFlatYaml
let diffNestedJson
let diffNestedYaml

beforeAll(() => {
  object1 = parserJson(getFixturePath('testFlat1.json'))
  object2 = parserJson(getFixturePath('testFlat2.json'))
  object3 = parserYml(getFixturePath('testFlat3.yml'))
  object4 = parserYml(getFixturePath('testFlat4.yaml'))
  object5 = parserJson(getFixturePath('testNested1.json'))
  object6 = parserJson(getFixturePath('testNested2.json'))
  object7 = parserYml(getFixturePath('testNested3.yml'))
  object8 = parserYml(getFixturePath('testNested4.yaml'))

  diffFlatJson = findDiffNested(object1, object2)
  diffFlatYaml = findDiffNested(object3, object4)
  diffNestedJson = findDiffNested(object5, object6)
  diffNestedYaml = findDiffNested(object7, object8)

  expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}'

  expectedNested = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}'

  expectedNestedPlain = 'Property \'common.follow\' was added with value: false'
    + '\nProperty \'common.setting2\' was removed'
    + '\nProperty \'common.setting3\' was updated. From true to null'
    + '\nProperty \'common.setting4\' was added with value: \'blah blah\''
    + '\nProperty \'common.setting5\' was added with value: [complex value]'
    + '\nProperty \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\''
    + '\nProperty \'common.setting6.ops\' was added with value: \'vops\''
    + '\nProperty \'group1.baz\' was updated. From \'bas\' to \'bars\''
    + '\nProperty \'group1.nest\' was updated. From [complex value] to \'str\''
    + '\nProperty \'group2\' was removed'
    + '\nProperty \'group3\' was added with value: [complex value]'

  expectedNestedJson = nestedResultJson
})

test('stylish output test', () => {
  expect(stylishOutput(diffFlatJson)).toStrictEqual(expected)
  expect(stylishOutput(diffFlatYaml)).toStrictEqual(expected)

  expect(stylishOutput(diffNestedJson)).toStrictEqual(expectedNested)
  expect(stylishOutput(diffNestedYaml)).toStrictEqual(expectedNested)
})
test('plain output test', () => {
  expect(plainOutput(diffNestedJson)).toStrictEqual(expectedNestedPlain)
  expect(plainOutput(diffNestedYaml)).toStrictEqual(expectedNestedPlain)
})
test('json output test', () => {
  expect(JSON.parse(jsonOutput(diffNestedJson))).toEqual(expectedNestedJson)
  expect(JSON.parse(jsonOutput(diffNestedYaml))).toEqual(expectedNestedJson)
})
