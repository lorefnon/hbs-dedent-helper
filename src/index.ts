import * as Handlebars from 'handlebars';
import assert from 'assert';

export let levelSize = 4;
export let levelChar = '\\s';

function buildMatcherRegex(count: number, unit: string) {
  switch (unit) {
    case 'level':
    case 'levels':
      return `${levelChar}{${count * levelSize}}`;
    case 'tab':
    case 'tabs':
      return `\\t{${count}}`;
    case 'space':
    case 'spaces':
      return `[ ]{${count}}`;
  }
  throw new Error(`Invalid unit specified: ${unit}`);
}

export function dedentHelper(
  this: any,
  count: number,
  unit: string,
  options: Handlebars.HelperOptions
) {
  const innerContent = options.fn(this);
  const regex = buildMatcherRegex(count, unit);
  return innerContent
    .split('\n')
    .map(line => {
      const match = line.match(new RegExp(`^(\\s*)(${regex})[^\\s]`));
      if (!match) return line;
      return `${match[1]}${line.slice(match[0].length - 1)}`;
    })
    .join('\n');
}

export function register() {
  Handlebars.registerHelper('dedent-by', function dedentBy(
    this: any,
    count: number,
    unit: string,
    options: Handlebars.HelperOptions
  ) {
    assert(typeof count === 'number', 'Expected count to be a number');
    assert(typeof unit === 'string', 'Expected unit to be a string');
    return dedentHelper.apply(this, [count, unit, options]);
  });
  Handlebars.registerHelper('dedent', function dedent(
    this: any,
    options: Handlebars.HelperOptions
  ) {
    return dedentHelper.apply(this, [1, 'level', options]);
  });
}

export function setLevelSize(size: number) {
  levelSize = size;
}

export function setLevelChar(char: string) {
  levelChar = char;
}
