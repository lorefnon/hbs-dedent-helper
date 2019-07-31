# Handlebars dedent helper

A simple handlebars helper to dedent blocks of text in handlebars. 

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

To solve this we provide two helpers: 

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

# Installation

```
npm install --save handlebars hbs-dedent-helper
```

# Registration

```
import {register} from "hbs-dedent-helper";

register();
```