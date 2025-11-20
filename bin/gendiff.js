#!/usr/bin/env node

import path from 'node:path';
import { Command } from 'commander';
import { parserJson, parserYml } from '../src/parsers.js';
import { stylishOutput, plainOutput } from '../src/outputStyles.js';
import findDiffNested from '../src/nestedCompare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2) => {
    let data1;
    let data2;
    let result;
    const formatter = program.opts().format;
    const format1 = path.extname(filepath1);
    const format2 = path.extname(filepath2);

    if (format1 === '.json') {
      data1 = parserJson(filepath1);
    } else {
      data1 = parserYml(filepath1);
    }

    if (format2 === '.json') {
      data2 = parserJson(filepath2);
    } else {
      data2 = parserYml(filepath2);
    }
    switch (formatter) {
      case 'plain':
        result = plainOutput(findDiffNested(data1, data2));
        break;
      default:
        result = stylishOutput(findDiffNested(data1, data2));
        break;
    }
    console.log(result);
    return result;
  });

program.parse();
