var Writer   = require('broccoli-writer'),
    depGraph = require('es-dependency-graph'),
    helpers  = require('broccoli-kitchen-sink-helpers'),
    walkSync = require('walk-sync'),
    extend   = require('extend'),
    util     = require('util'),
    path     = require('path'),
    fs       = require('fs');

module.exports = GraphWriter;

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

GraphWriter.prototype.defaults = {
    includeBindings: false,
    dest: 'dep-graph.json'
};

GraphWriter.prototype.write = function (readTree, destDir) {
    var options = this.options,
        cache   = this._cache;

    return readTree(this.inputTree).then(function (srcDir) {
        var graph   = {},
            jsFiles = walkSync(srcDir).filter(function (relPath) {
                return path.extname(relPath) === '.js';
            });

        jsFiles.forEach(function (relPath) {
            var cacheEntry = cache[relPath],
                srcPath    = path.join(srcDir, relPath),
                statsHash  = helpers.hashTree(srcPath),
                result;

            if (cacheEntry && cacheEntry.statsHash === statsHash) {
                result = cacheEntry.result;
            } else {
                result = depGraph(fs.readFileSync(srcPath, 'utf8'), {
                    includeBindings: options.includeBindings
                });

                cache[relPath] = {
                    result: result,
                    statsHash: statsHash
                };
            }

            graph[relPath.substr(0, relPath.length - 3)] = result;
        });

        fs.writeFileSync(path.join(destDir, options.dest),
            JSON.stringify(graph), 'utf8');
    });
};
