var expect = require('chai').expect,
    path   = require('path'),
    fs     = require('fs');

var compareFolder = path.join(__dirname, 'compare/');

function parse(fileName, callback) {
    return JSON.parse(fs.readFileSync(path.join(compareFolder, fileName), 'utf8'));
}

describe('expected results', function () {
    describe('simple mode', function () {
        it('should produce the expected JSON result', function () {
            var expected = parse('expected/simple.json'),
                actual = parse('actual/simple.json');

            expect(actual)
                .to.deep.equal(expected);
        });
    });
    describe('full mode', function () {
        it('should produce the expected JSON result', function () {
            var expected = parse('expected/full.json'),
                actual = parse('actual/full.json');

            expect(actual)
                .to.deep.equal(expected);
        });
    });
    describe('full mode with normalization', function () {
        it('should produce the expected JSON result', function () {
            var expected = parse('expected/normalized.json'),
                actual = parse('actual/normalized.json');

            expect(actual)
                .to.deep.equal(expected);
        });
    });
});
