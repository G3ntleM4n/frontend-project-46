#!/usr/bin/env node

import { Command } from 'commander';
import parserJson from '../src/parser.js';
import findDiff from '../src/findDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2) => {
    const [data1, data2] = parserJson(filepath1, filepath2);
    console.log(findDiff(data1, data2));
  });

program.parse();
