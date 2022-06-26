import Handlebars from 'handlebars';
import { register, levelSize, setLevelSize } from '../src';

register();

describe('dedent', () => {
  const sampleTemplate = `
        if (foo) {
            {{#dedent}}
                console.log('foo');
            {{/dedent}}
        }
    `;
  it('dedents by single level', () => {
    const result = Handlebars.compile(sampleTemplate)({});
    expect(result).toMatchInlineSnapshot(`
            "
                    if (foo) {
                        console.log('foo');
                    }
                "
        `);
  });
  it('can be configured to dedent by adhoc levels', () => {
    const oldLevelSize = levelSize;
    setLevelSize(2);
    const result = Handlebars.compile(sampleTemplate)({});
    expect(result).toMatchInlineSnapshot(`
            "
                    if (foo) {
                          console.log('foo');
                    }
                "
        `);
    setLevelSize(oldLevelSize);
  });
});

describe('dedent-by', () => {
  it('allows dedenting by multiple levels', () => {
    const sampleTemplate = `
            if (foo) {
                {{#dedent-by 2 "level"}}
                    {{#each items}}
                        console.log('{{.}}')
                    {{/each}}
                {{/dedent-by}}
            }
        `;
    const result = Handlebars.compile(sampleTemplate)({
      items: ['a', 'b'],
    });
    expect(result).toMatchInlineSnapshot(`
            "
                        if (foo) {
                            console.log('a')
                            console.log('b')
                        }
                    "
        `);
  });
  it('allows dedenting by multiple levels', () => {
    const sampleTemplate = `
            if (foo) {
                {{#dedent-by 8 "space"}}
                    {{#each items}}
                        console.log('{{.}}')
                    {{/each}}
                {{/dedent-by}}
            }
        `;
    const result = Handlebars.compile(sampleTemplate)({
      items: ['a', 'b'],
    });
    expect(result).toMatchInlineSnapshot(`
            "
                        if (foo) {
                            console.log('a')
                            console.log('b')
                        }
                    "
        `);
  });
  it('allows dedenting by multiple levels', () => {
    const sampleTemplate = `
            if (foo) {
            \t{{#dedent-by 2 "tab"}}
            \t\t{{#each items}}
            \t\t\tconsole.log('{{.}}')
            \t\t{{/each}}
            \t{{/dedent-by}}
            }
        `;
    const result = Handlebars.compile(sampleTemplate)({
      items: ['a', 'b'],
    });
    expect(result).toMatchInlineSnapshot(`
      "
                  if (foo) {
                  \tconsole.log('a')
                  \tconsole.log('b')
                  }
              "
    `);
  });

  describe('base-indent', () => {
    it('updates the minimum indent to base indent', () => {
      const sampleTemplate = `
            if (foo) {
                {{#base-indent 4 "space"}}
                      {{#each items}}
                          console.log('{{.}}')
                      {{/each}}
                {{/base-indent}}
            }
          `;
      const result = Handlebars.compile(sampleTemplate)({
        items: ['a', 'b'],
      });
      expect(result).toMatchInlineSnapshot(`
        "
                    if (foo) {
            console.log('a')
            console.log('b')
                    }
                  "
      `);
    });
  });

  describe('trim-trailing-whitespace', () => {
    it('removes trailing whitespace', () => {
      const sampleTemplate = `
      {{#trim-trailing-whitespace}}
      foo
      bar${` `}
      baz${'\t\t\t'}
      {{/trim-trailing-whitespace}}`;
      const result = Handlebars.compile(sampleTemplate)({});
      expect(result).toMatchInlineSnapshot(`
        "
              foo
              bar
              baz
        "
      `);
    });
  });
});
