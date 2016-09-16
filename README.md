# Usage

Broccoli-whatchanged is a debug plugin, providing visibility in what changed.

#### basic

```js
var whatchanged = require('broccoli-whatchanged');
var lib = 'lib';

module.exports = whatchanged(lib);
// will log on each rebuild "what changed, [operation, relativePath]"
```

#### \w callback


```js
var whatchanged = require('broccoli-whatchanged');
var lib = 'lib';

module.exports = whatchanged(lib, function({ patches, beforeTree, afterTree, plugin }) {
  debugger; debug, or do what you want.
});
```
