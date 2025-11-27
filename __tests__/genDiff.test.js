import nestedResultJson from '../__fixtures__/nestedResult'
import genDiff from '../src/genDiff.js'

let expected
let expectedNested
let expectedNestedPlain
let expectedNestedJson

beforeAll(() => {
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

test('stylish diff test', () => {
  expect(genDiff('files/file1.json', 'files/file2.json')).toStrictEqual(expected)
  expect(genDiff('files/file3.yml', 'files/file4.yaml', 'stylish')).toStrictEqual(expected)

  expect(genDiff('files/nested1.json', 'files/nested2.json', 'stylish')).toStrictEqual(expectedNested)
  expect(genDiff('files/nested3.yml', 'files/nested4.yaml')).toStrictEqual(expectedNested)
})
test('plain diff test', () => {
  expect(genDiff('files/nested1.json', 'files/nested2.json', 'plain')).toStrictEqual(expectedNestedPlain)
  expect(genDiff('files/nested3.yml', 'files/nested4.yaml', 'plain')).toStrictEqual(expectedNestedPlain)
})
test('json diff test', () => {
  expect(JSON.parse(genDiff('files/nested1.json', 'files/nested2.json', 'json'))).toEqual(expectedNestedJson)
  expect(JSON.parse(genDiff('files/nested3.yml', 'files/nested4.yaml', 'json'))).toEqual(expectedNestedJson)
})
