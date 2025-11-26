#!/usr/bin/env node

import { Command } from 'commander';

import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2) => {
    const formatter = program.opts().format;
    return genDiff(filepath1, filepath2, formatter);
  });

program.parse();
