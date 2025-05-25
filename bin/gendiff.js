#!/usr/bin/env node

import { Command } from 'commander';
import { parserJson, parserYml } from '../src/parsers.js';
import findDiff from '../src/flatCompare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2) => {
    let data1;
    let data2;
    if (filepath1.includes('.json')) {
      data1 = parserJson(filepath1);
    } else {
      data1 = parserYml(filepath1);
    }

    if (filepath2.includes('.json')) {
      data2 = parserJson(filepath2);
    } else {
      data2 = parserYml(filepath2);
    }
    console.log(findDiff(data1, data2));
  });

program.parse();
