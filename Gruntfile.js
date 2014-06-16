module.exports = function (grunt) {
    grunt.initConfig({
        broccoli_build: {
            build: {
                dest: 'build/'
            }
        },

        clean: {
            build: 'build/',
            tmp  : 'tmp/'
        }
    });

    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'broccoli_build', 'clean:tmp']);
};
