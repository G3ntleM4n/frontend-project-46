import * as fs from 'node:fs';
import yaml from 'js-yaml';

export const parserJson = (filepath) => {
  if (!filepath.includes('.json')) {
    throw new Error("file extension isn't right");
  }
  const file = fs.readFileSync(filepath, { encoding: 'utf-8' });
  return JSON.parse(file);
};

export const parserYml = (filepath) => {
  if (!filepath.includes('.yml') && !filepath.includes('.yaml')) {
    throw new Error("file extension isn't right");
  }
  const file = fs.readFileSync(filepath, { encoding: 'utf-8' });
  return yaml.load(file);
};
