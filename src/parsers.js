import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const pathResolve = (filepath) => path.resolve(cwd(), filepath);

export const parserJson = (filepath) => {
  if (!filepath.includes('.json')) {
    throw new Error("file extension isn't JSON");
  }
  const file = fs.readFileSync(pathResolve(filepath), { encoding: 'utf-8' });
  return JSON.parse(file);
};

export const parserYml = (filepath) => {
  if (!filepath.includes('.yml') && !filepath.includes('.yaml')) {
    throw new Error("file extension isn't YAML");
  }
  const file = fs.readFileSync(pathResolve(filepath), { encoding: 'utf-8' });
  return yaml.load(file);
};
