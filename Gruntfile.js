'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source',
      build: 'dist',
      tmp: '.tmp'
    },

    assemble: {
      options: {
        layoutdir: '<%= config.source %>/templates/layout',
        partials: '<%= config.source %>/templates/partials/**/*.html',
        data: '<%= config.source %>/data/**/*.json'
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
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        cwd: '<%= config.tmp %>/concat/css',
        dest: '<%= config.tmp %>/concat/css',
        src: '*.css'
      }
    },

    browserSync: {
      bsFiles: {
        src: [
          '<%= config.source %>/**/*.html',
          '<%= config.source %>/css/*.css',
          '<%= config.source %>/js/*.js',
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: 'source/'
        }
      }
    },

    clean: {
      dist: ['<%= config.build %>'],
      tmp: ['<%= config.tmp %>'],
      sass: ['.sass-cache']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '<%= config.tmp %>/concat/css',
        dest: '<%= config.tmp %>/concat/css',
        src: '*.css'
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
      files: {
        expand: true,
        cwd: '<%= config.source %>',
        src: '**/*.{gif,ico,jpg,jpeg,png}',
        dest: '<%= config.build %>'
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

    sass: {
      files: {
        expand: true,
        cwd: '<%= config.source %>/scss',
        dest: '<%= config.source %>/css',
        src: '**/*.scss',
        ext: '.css'
      }
    },

    scsslint: {
      files: ['<%= config.source %>/scss/**/*.scss']
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
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/img',
          '<%= config.dist %>/css'
        ]
      },
      html: '<%= config.build %>/index.html',
      css: '<%= config.build %>/css/**/*.css'
    },

    useminPrepare: {
      options: {
        dest: '<%= config.build %>'
      },
      html: '<%= config.source %>/index.html'
    },

    watch: {
      css: {
        files: [
          '<%= config.source %>/css/**/*.css'
        ],
        tasks: []
      },
      gruntfile: {
        files: ['gruntfile.js'],
        tasks: ['jshint']
      },
      html: {
        files: [
          '<%= config.source %>/templates/**/*.html'
        ],
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
        tasks: []
      },
      sass: {
        files: [
          '<%= config.source %>/scss/**/*.scss'
        ],
        tasks: ['scsslint', 'sass']
      },
      svg: {
        files: [
          '<%= config.source %>/img/icons/*.svg'
        ],
        tasks: ['svgmin', 'svgstore']
      }
    }

  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [
    'browserSync',
    'sass',
    'svgmin',
    'svgstore',
    'assemble',
    'watch'
  ]);

  grunt.registerTask('test', [
    'scsslint',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'sasslint',
    'jshint',
    'clean:dist',
    'assemble',
    'copy',
    'sass',
    'useminPrepare',
    'concat',
    'autoprefixer',
    'cmq',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
    'svgmin',
    'svgstore',
    'imagemin',
    'clean:tmp',
    'clean:sass'
  ]);

};
