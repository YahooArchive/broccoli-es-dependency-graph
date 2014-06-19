var depGraph   = require('./index'),
    mergeTrees = require('broccoli-merge-trees');

var simple = depGraph('tests/compare/source/', {
        dest: 'simple.json'
    }),
    full   = depGraph('tests/compare/source/', {
        includeBindings: true,
        dest: 'full.json'
    });

module.exports = mergeTrees([simple, full]);
