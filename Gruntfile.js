module.exports = function (grunt) {
    grunt.initConfig({
        broccoli_build: {
            build: {
                dest: 'tests/compare/actual/'
            }
        },

        mochaTest: {
            dev: {
                src: ['tests/*.js']
            }
        },

        clean: {
            build: 'tests/compare/actual/',
            tmp  : 'tmp/'
        }
    });

    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('build', ['clean', 'broccoli_build', 'clean:tmp']);
    grunt.registerTask('test', ['build', 'mochaTest:dev']);
    grunt.registerTask('default', ['build']);
};
