/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/broccoli-es-dependency-graph/blob/master/LICENSE.md
*/
var Writer   = require('broccoli-writer'),
    depGraph = require('es-dependency-graph'),
    helpers  = require('broccoli-kitchen-sink-helpers'),
    walkSync = require('walk-sync'),
    extend   = require('extend'),
    util     = require('util'),
    path     = require('path'),
    fs       = require('fs');

module.exports = GraphWriter;

// GraphWriter writes only a single JSON file based on parsing all the
// files in the tree
// 
// The options object may include a `moduleName` function that normalizes
// module names. It receives both the path to the module and the parent's
// path
function GraphWriter(inputTree, options) {
    if (!(this instanceof GraphWriter)) {
        return new GraphWriter(inputTree, options);
    }
    Writer.call(this, inputTree);

    this.inputTree = inputTree;
    this.options   = extend({}, this.defaults, options || {});
    this._cache    = {};
}
util.inherits(GraphWriter, Writer);

// default options
GraphWriter.prototype.defaults = {
    // es-dependecy-graph option
    includeBindings: false,
    // path where to write the generated json file
    dest: 'dep-graph.json'
};

GraphWriter.prototype.write = function (readTree, destDir) {
    var options   = this.options,
        cache     = this._cache,
        normalize = options.moduleName;

    return readTree(this.inputTree).then(function (srcDir) {
        var graph   = {},
            jsFiles = walkSync(srcDir).filter(function (relPath) {
                return path.extname(relPath) === '.js';
            });

        // assume all js files are ES6 modules
        // it's the responsibility of the user to filter the tree first
        jsFiles.forEach(function (relPath) {
            var cacheEntry = cache[relPath],
                srcPath    = path.join(srcDir, relPath),
                currDir    = path.dirname(relPath),
                statsHash  = helpers.hashTree(srcPath),
                result;

            // simple caching of results
            if (cacheEntry && cacheEntry.statsHash === statsHash) {
                result = cacheEntry.result;
            } else {
                result = depGraph(fs.readFileSync(srcPath, 'utf8'), {
                    includeBindings: options.includeBindings
                });

                // normalize each dependency
                if (normalize) {
                    if (options.includeBindings) {
                        // the structure is { imports: {moduleName: []}, exports: [] }
                        Object.keys(result.imports).forEach(function (name, i) {
                            var data = result.imports[name];
                            delete result.imports[name];
                            result.imports[normalize(name, currDir)] = data;
                        });
                    } else {
                        result = result.map(function (name) {
                            return normalize(name, currDir);
                        });
                    }
                }

                cache[relPath] = {
                    result: result,
                    statsHash: statsHash
                };
            }

            // normalize the module name
            if (normalize) {
                relPath = normalize(relPath, currDir);
            }

            graph[relPath] = result;
        });

        fs.writeFileSync(path.join(destDir, options.dest),
            JSON.stringify(graph), 'utf8');
    });
};
