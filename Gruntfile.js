module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var modRewrite = require('connect-modrewrite'),
    mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
    };

  grunt.initConfig({
    config: {
      src: 'src',
      stage: '.tmp',
      dist: 'build'
    },
    env: {
      dev: { ENV: 'development' },
      prod: { ENV: 'production' }
    },
    clean: {
      dist: ['<%= config.dist %>'],
    },
    preprocess: {
      indexToDist: {
        src: '<%= config.src %>/index.html',
        dest: '<%= config.dist %>/index.html'
      }
    },
    copy: {
      appToDist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'app/**/*',
            ],
            dest: '<%= config.dist %>'
          }
        ]
      },
      componentsToDist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'components/**/*',
            ],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    compass: {
      stylesToDist: {
        options: {
          sassDir: '<%= config.src %>/styles',
          cssDir: '<%= config.dist %>/styles'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '<%= config.dist %>',
          keepalive: true,
          debug: true,
          middleware: function(connect) {
            return [
              modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']),
              mountFolder(connect, 'build')
            ]
          }
        }
      }
    },
    watch: {
      app: {
        files: '<%= config.src %>/app/**/*',
        tasks: ['copy:appToDist'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      },
      styles: {
        files: '<%= config.src %>/styles/**/*',
        tasks: ['compass:stylesToDist'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      },
      index: {
        files: '<%= config.src %>/index.html',
        tasks: ['preprocess:indexToDist'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    },
    concurrent: {
      dev: {
        tasks: [
          'watch',
          'connect:server'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'preprocess:indexToDist',
    'copy:componentsToDist',
    'copy:appToDist',
    'compass:stylesToDist'
  ]);

  grunt.registerTask('dev', [
    'env:dev',
    'build',
    'concurrent:dev'
  ]);

  grunt.registerTask('prod', [
    'env:prod',
    'build'
  ]);
}
