'use strict';

var webp = require('imagemin-webp');

module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    cmq: 'grunt-combine-media-queries',
    scsslint: 'grunt-scss-lint',
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source',
      build: 'dist',
      tmp: '.tmp'
    },

    assemble: {
      options: {
        layout: 'default.html',
        layoutdir: '<%= config.source %>/templates/layouts',
        partials: '<%= config.source %>/templates/partials/**/*.html'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/templates/pages',
        dest: '<%= config.source %>',
        src: '**/*.html'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions'],
        map: true
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/css',
        dest: '<%= config.source %>/css',
        src: '*.css'
      }
    },

    clean: {
      dist: ['<%= config.build %>'],
      tmp: ['<%= config.tmp %>']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '*.css'
      }
    },

    connect: {
      options: {
        hostname: 'localhost',
        open: true,
        livereload: true
      },
      develop: {
        options: {
          port: 4000,
          base: {
            path: '<%= config.source %>'
          }
        }
      },
      build: {
        options: {
          port: 3000,
          base: {
            path: '<%= config.build %>'
          }
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= config.source %>/fonts',
        dest: '<%= config.build %>/fonts',
        src: '**/*.{otf,svg,ttf,woff,woff2}',
      },
      html: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '*.html',
      },
      config: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: ['.htaccess', '*.xml', '*.txt'],
      },
      svg: {
        expand: true,
        cwd: '<%= config.source %>/img',
        dest: '<%= config.build %>/img',
        src: ['icons.svg'],
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true,
        caseSensitive: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      files: {
        expand: true,
        cwd: '<%= config.build %>',
        dest: '<%= config.build %>',
        src: '*.html'
      }
    },

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= config.source %>',
          src: '**/*.{gif,ico,jpg,jpeg,png}',
          dest: '<%= config.build %>'
        }]
      },
      webp: {
        options: {
          use: [
            webp()
          ]
        },
        files: [{
          expand: true,
          cwd: '<%= config.source %>/content/images',
          src: '**/*.{gif,jpg,jpeg,png}',
          dest: '<%= config.build %>/content/images'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      files: [
        'gruntfile.js',
        '<%= config.source %>/js/**/*.js',
        '!source/js/libs/**/*.js'
      ]
    },

    postcss: {
      options: {
        map: {
            inline: false
        },
        processors: [
          require('postcss-import')(),
          require('postcss-cssnext')({
            features: {
              rem: false
            },
          })
        ]
      },
      target: {
        files: {
          '<%= config.build %>/css/style.css': ['<%= config.source %>/css/style.css']
        }
      }
    },

    svgmin: {
      files: {
        expand: true,
        cwd: '<%= config.source %>/img/icons',
        dest: '<%= config.tmp %>/img/icons',
        ext: '.svg',
        src: ['**/*.svg']
      }
    },

    svgstore: {
      options: {
        prefix : 'icon--',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      default: {
        files: {
          '<%= config.source %>/img/icons.svg': ['<%= config.tmp %>/img/icons/*.svg'],
        }
      }
    },

    usemin: {
      html: '<%= config.build %>/**/*.html',
    },

    useminPrepare: {
      options: {
        dest: '<%= config.build %>'
      },
      html: '<%= config.source %>/index.html'
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: [
          '<%= config.source %>/css/**/*.css'
        ],
        tasks: ['postcss']
      },
      gruntfile: {
        files: ['gruntfile.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['<%= config.source %>/templates/**/*.html'],
        tasks: ['assemble']
      },
      js: {
        files: [
          '<%= config.source %>/js/**/*.js'
        ],
        tasks: ['jshint']
      },
      img: {
        files: [
          '<%= config.source %>/**/*.{gif,ico,jpg,jpeg,png}'
        ],
        tasks: ['imagemin']
      },
      svg: {
        files: [
          '<%= config.source %>/img/icons/*.svg'
        ],
        tasks: ['svgmin', 'svgstore']
      }
    }

  });

  grunt.registerTask('default', [
    // Linting
    'jshint',

    // CSS
    'postcss',

    // Images
    'svgmin',
    'svgstore',

    // HTML
    'assemble',

    // Server
    'connect:develop',
    'watch'
  ]);

  grunt.registerTask('test', [
    // Linting
    'jshint'
  ]);

  grunt.registerTask('build', [
    // Linting
    'jshint',

    // Clean
    'clean:dist',

    'svgmin',
    'svgstore',
    'copy',

    // CSS
    'postcss',

    // HTML
    'assemble',

    // Usemin
    'useminPrepare',
    'concat:generated',
    'cmq',
    'cssmin',
    'uglify:generated',
    'usemin',

    // Minification
    'htmlmin',

    // Images
    'imagemin',

    // Clean
    'clean:tmp'
  ]);

};
