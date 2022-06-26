import * as Handlebars from 'handlebars';
import assert from 'assert';
import { match } from 'ts-pattern';
import repeat from 'lodash.repeat';
import isEmpty from 'lodash.isempty'

export let levelSize = 4;
export let levelChar = '\\s';

type Unit = 'level' | 'levels' | 'tab' | 'tabs' | 'space' | 'spaces';

const buildMatcherRegex = (count: number, unit: Unit) =>
  match(unit)
    .with('level', 'levels', () => `${levelChar}{${count * levelSize}}`)
    .with('tab', 'tabs', () => `\\t{${count}}`)
    .with('space', 'spaces', () => `[ ]{${count}}`)
    .exhaustive();

export function dedentHelper(
  this: any,
  count: number,
  unit: Unit,
  options: Handlebars.HelperOptions
) {
  const innerContent = options.fn(this);
  const regex = buildMatcherRegex(count, unit);
  return innerContent
    .split('\n')
    .map((line) => {
      const match = line.match(new RegExp(`^(\\s*)(${regex})[^\\s]`));
      if (!match) return line;
      return `${match[1]}${line.slice(match[0].length - 1)}`;
    })
    .join('\n');
}

const convertToRaw = (count: number, unit: Unit) =>
  repeat(
    match(unit)
      .with('level', 'levels', () => levelChar)
      .with('tab', 'tabs', () => '\t')
      .with('space', 'spaces', () => ' ')
      .exhaustive(),
    count
  );

export function baseIndentHelper(
  this: any,
  count: number,
  unit: Unit,
  options: Handlebars.HelperOptions
) {
  const innerContent = options.fn(this);
  const lines = innerContent.split('\n');
  const indents = 
    lines
      .filter(line => !isEmpty(line))
      .map((line) => line.match(/^(\s*)/)?.[1]?.length ?? 0)
      const minIndent = Math.min(...indents)
  const minIndentRegex = new RegExp(`^\\s{${minIndent}}`);
  const rawBaseIndent = convertToRaw(count, unit);
  return lines
    .map((line) => {
      return line.replace(minIndentRegex, rawBaseIndent);
    })
    .join('\n');
}

export function trimTrailingWSHelper(
  this: any,
  options: Handlebars.HelperOptions
) {
  return options
    .fn(this)
    .split('\n')
    .map(it => it.replace(/\s+$/, ''))
    .join('\n')
}

export function register() {
  Handlebars.registerHelper(
    'dedent-by',
    function dedentBy(
      this: any,
      count: number,
      unit: Unit | null | undefined,
      options: Handlebars.HelperOptions
    ) {
      assert(typeof count === 'number', 'Expected count to be a number');
      return dedentHelper.apply(this, [count, unit || 'level', options]);
    }
  );
  Handlebars.registerHelper(
    'dedent',
    function dedent(this: any, options: Handlebars.HelperOptions) {
      return dedentHelper.apply(this, [1, 'level', options]);
    }
  );
  Handlebars.registerHelper(
    'base-indent',
    function baseIndent(this: any, count: number, unit: Unit | null | undefined, options: Handlebars.HelperOptions) {
      assert(typeof count === 'number', 'Expected count to be a number');
      return baseIndentHelper.apply(this, [count, unit || 'level', options])
    }
  )
  Handlebars.registerHelper(
    'trim-trailing-whitespace',
    function trimTrailingWS(this: any, options: Handlebars.HelperOptions) {
      return trimTrailingWSHelper.apply(this, [options]);
    }
  )
}

export function setLevelSize(size: number) {
  levelSize = size;
}

export function setLevelChar(char: string) {
  levelChar = char;
}
