# Handlebars dedent helper

A set of simple handlebars helpers to help with indentation

Very often, when using block helpers our code would end up nested more than it should be. Which can be problematic for code-generators:

```
if (foo) {
    {{#each items}}
        console.log('{{.}}')
    {{/each}}
}
```

generates something like: 

```js
if (foo) {
        console.log('a');
        console.log('b');
}
```

This is visually unappealing. In addition, for indentation sensitve languages this can break the code.

To solve this we provide following helpers: 

1. `dedent` helper: 

(Dedents a block of code by one level)

```
if (foo) {
    {{#each items}}
        {{#dedent}}
        console.log('{{.}}')
        {{/dedent}}
    {{/each}}
}
```

One level defaults to 4 spaces. But this is configurable through setLevelSize & setLevelChar: 

```js
import {setLevelSize} from "hbs-dedent-helper";

// Configure dedent helper to use 1 tab
setLevelSize(1);
setLevelChar('\\t');
```

2. `dedent-by` helper provides more control: 

```
if (foo) {
    {{#dedent-by 2 "level"}}
        {{#each items}}
            console.log('{{.}}')
        {{/each}}
    {{/dedent-by}}
}
```

We can also explicitly use tabs or spaces: 

```
if (foo) {
    {{#dedent-by 8 "spaces"}}
        {{#each items}}
            console.log('{{.}}')
        {{/each}}
    {{/dedent-by}}
}
```

```
if (foo) {
    {{#dedent-by 2 "tabs"}}
        {{#each items}}
            console.log('{{.}}')
        {{/each}}
    {{/dedent-by}}
}
```

3. `base-indent` helper:

(Changes the minimum indentation of all lines in the contained block, while retaining relative indentation)

```
if (foo) {
    {{#base-indent 1 "level"}}
        {{#each items}}
            console.log('{{.}}')
        {{/each}}
    {{/base-indent}}
}
```

```
if (foo) {
    console.log(1)
}
```

This is particularly useful when including other templates in a base template.

4. `trim-trailing-whitespace` helper:

(Removes all trailing whitespace in generated output)

# Installation

```
npm install --save handlebars hbs-dedent-helper
```

# Registration

```
import {register} from "hbs-dedent-helper";

register();
```