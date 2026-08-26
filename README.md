[![Actions Status](https://github.com/G3ntleM4n/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/G3ntleM4n/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=G3ntleM4n_frontend-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=G3ntleM4n_frontend-project-46)

[Русский](README.ru.md) | English

# Gendiff

**Gendiff** is a command-line utility for comparing two configuration files and clearly displaying the differences between them. It supports **JSON** and **YAML** (`.yml`/`.yaml`) formats, and files can be either flat or nested (with any level of nesting).

The utility can display the comparison result in three different output styles: `stylish` (default), `plain`, and `json`.

## Requirements

Before installing, make sure **Node.js** version 18 or higher is installed on your computer (its package manager `npm` is installed automatically with it).

Check your Node.js version:

```bash
node -v
```

If the command is not found, download and install Node.js from the official website: <https://nodejs.org>

## Installation

1. Download (or clone) the project and go into its folder:

   ```bash
   cd frontend-project-46-main
   ```

2. Install the project dependencies:

   ```bash
   make install
   ```

   This is a shortcut for `npm ci` — it installs all required libraries into the `node_modules` folder.

3. Make the utility available globally so you can run it from any folder with the `gendiff` command:

   ```bash
   npm link
   ```

## Usage

General command syntax:

```bash
gendiff [options] <path_to_file_1> <path_to_file_2>
```

If you did not run `npm link`, run the utility via `node`:

```bash
node bin/gendiff.js <path_to_file_1> <path_to_file_2>
```

### Options

| Option | Description |
| --- | --- |
| `-f, --format [type]` | Output format: `stylish` (default), `plain`, or `json` |
| `-V, --version` | Show the utility's version |
| `-h, --help` | Show command help |

### Supported file formats

- `.json`
- `.yml` / `.yaml`

You can compare files of different formats against each other (for example, a JSON file against a YAML file).

## Usage examples

The examples below use the sample files `files/file1.json` and `files/file2.json` from the project:

**file1.json**

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

**file2.json**

```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

### `stylish` format (default)

```bash
gendiff files/file1.json files/file2.json
```

```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

Here `-` means a removed property, `+` means an added property, and properties without a sign are unchanged.

### `plain` format

```bash
gendiff files/file1.json files/file2.json --format plain
```

```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

### `json` format

```bash
gendiff files/file1.json files/file2.json --format json
```

```json
{
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
}
```

### Comparing nested configurations

The utility also correctly handles nested structures (files `files/nested1.json` and `files/nested2.json`):

```bash
gendiff files/nested1.json files/nested2.json --format plain
```

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

## Useful commands for development

```bash
make install         # install dependencies (npm ci)
make lint             # check the code with ESLint
make lint-fix         # automatically fix linter errors
make test             # run the tests
make test-coverage    # run the tests with a coverage report
make publish          # dry-run package publish (npm publish --dry-run)
```

## Project structure

```
frontend-project-46-main/
├── bin/
│   └── gendiff.js           # CLI entry point (argument and option parsing)
├── src/
│   ├── genDiff.js            # main function: reading files and choosing the formatter
│   ├── parsers.js            # JSON and YAML file parsing
│   ├── nestedCompare.js       # builds the diff tree (including nested structures)
│   └── outputStyles.js        # formats the result: stylish, plain, json
├── files/                    # sample files for comparison (json/yml/yaml)
├── __fixtures__/              # test data
├── __tests__/                 # automated tests
├── package.json               # project dependencies and scripts
└── Makefile                   # short commands for install/test/lint
```

## Video examples

**Comparing flat JSON files**

[![asciicast](https://asciinema.org/a/HJ2iOMlCH0NIpUll2abx0FSNo.svg)](https://asciinema.org/a/HJ2iOMlCH0NIpUll2abx0FSNo)

**Comparing flat YAML files**

[![asciicast](https://asciinema.org/a/WWBVwNPL2P8Xh1godohHP3FXu.svg)](https://asciinema.org/a/WWBVwNPL2P8Xh1godohHP3FXu)

**Comparing nested JSON & YAML (stylish formatter)**

[![asciicast](https://asciinema.org/a/Gi5ZTFTHmSCnQ9fTrEVtwB5Ew.svg)](https://asciinema.org/a/Gi5ZTFTHmSCnQ9fTrEVtwB5Ew)

**Comparing nested JSON & YAML (plain formatter)**

[![asciicast](https://asciinema.org/a/KrTDoAE8tF2caHeszdfxTLkAg.svg)](https://asciinema.org/a/KrTDoAE8tF2caHeszdfxTLkAg)

**Comparing nested JSON & YAML (json formatter)**

[![asciicast](https://asciinema.org/a/zDkM3P3mLvLrki4mLlT8eB5e2.svg)](https://asciinema.org/a/zDkM3P3mLvLrki4mLlT8eB5e2)
