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
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => parserJson(filepath1, filepath2))
  .action((filepath1, filepath2) => findDiff(filepath1, filepath2));

program.parse();
