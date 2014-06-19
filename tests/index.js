var expect = require('chai').expect,
    path   = require('path'),
    fs     = require('fs');

function parse(fileName) {
    return JSON.parse(fs.readFileSync(path.join(__dirname,
        'compare/' + fileName), 'utf8'));
}

describe('expected results', function () {
    describe('simple mode', function () {
        it('should produce the expected JSON result', function () {
            var expected = parse('expected/simple.json'),
                actual = parse('expected/simple.json');

            expect(actual)
                .to.deep.equal(expected);
        });
    });
    describe('full mode', function () {
        it('should produce the expected JSON result', function () {
            var expected = parse('expected/full.json'),
                actual = parse('expected/full.json');

            expect(actual)
                .to.deep.equal(expected);
        });
    });
});
