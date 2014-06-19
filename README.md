broccoli-es-dependency-graph
============================

[![Build Status](https://travis-ci.org/yahoo/broccoli-es-dependency-graph.svg?branch=master)](https://travis-ci.org/yahoo/broccoli-es-dependency-graph)
[![Dependency Status](https://gemnasium.com/yahoo/broccoli-es-dependency-graph.svg)](https://gemnasium.com/yahoo/broccoli-es-dependency-graph)
[![NPM version](https://badge.fury.io/js/broccoli-es-dependency-graph.svg)](http://badge.fury.io/js/broccoli-es-dependency-graph)

Broccoli plugin for obtaining the dependency graph from ES6 modules.

Limitations
-----------

See limitations in [es-dependency-graph-limitations][].https://github.com/yahoo/es-dependency-graph#limitations

API
---

### depGraph(inputTree, [options])

Generates a JSON file with the dependency information for all the files in the
`inputTree`. Options:

  * *dest*: name of the JSON file to generate. Default: `dep-graph.json`.
  * *includeBindings*: whether to include the names of all the imports and exports in each module. Default: false.
  * *moduleName*: a function that modifies the name of each module. It received two parameters: the current path and the path to the parent module in the case of an import. You can use this function to remove file extensions from module names and normalize them across your project. Example:

```js
var result = depGraph(tree, {
    moduleName: function (importPath, modulePath) {
        return path.join(path.dirname(modulePath), importPath);
    }
})
```

License
-------

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

Contribute
----------

See the [CONTRIBUTING file][] for info.


[CONTRIBUTING file]: https://github.com/yahoo/broccoli-es-dependency-graph/blob/master/CONTRIBUTING.md
[LICENSE file]: https://github.com/yahoo/broccoli-es-dependency-graph/blob/master/LICENSE.md
[es-dependency-graph-limitations]: https://github.com/yahoo/es-dependency-graph#limitations
