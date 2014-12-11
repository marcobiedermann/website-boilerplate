'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source',
      build: 'build',
      tmp: '.tmp'
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
        src: '**/*.css'
      }
    },

    clean: {
      build: ['<%= config.build %>'],
      tmp: ['<%= config.tmp %>']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    // concat: {
    //   options: {
    //   },
    //   js: {
    //     src: [
    //       '<%= config.source %>/js/jquery-1.11.1.js',
    //       '<%= config.source %>/js/jquery-ui-1.10.4.js',
    //       '<%= config.source %>/js/jquery.carouFredSel-6.2.1.js',
    //       '<%= config.source %>/js/jquery.fancybox-2.1.5.js',
    //       '<%= config.source %>/js/jquery.fancybox-buttons-1.0.5.js',
    //       '<%= config.source %>/js/jquery.fancybox-thumbs-1.0.7.js',
    //       '<%= config.source %>/js/jquery.placeholder-2.0.8.js',
    //       '<%= config.source %>/js/isotope.pkgd.js',
    //       '<%= config.source %>/js/masonry.pkgd.js',
    //       '<%= config.source %>/js/picturefill.js',
    //       '<%= config.source %>/js/selectivizr.js',
    //       '<%= config.source %>/js/script.js'
    //     ],
    //     dest: '<%= config.build %>/js/script.js',
    //   }
    // },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          livereload: true,
          open: true,
          port: 8888
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= config.source %>/fonts',
        dest: '<%= config.build %>/fonts',
        src: '**/*'
      },
      html: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '**/*.html'
      }
    },

    criticalcss: {

    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= config.source %>/css/**/*.css']
    },

    // cssmin: {
    //   files: {
    //     expand: true,
    //     cwd: '<%= config.build %>/css',
    //     dest: '<%= config.build %>/css',
    //     src: '**/*.css'
    //   }
    // },

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
        src: '**/*.html'
      }
    },

    imagemin: {
      files: {
        expand: true,
        cwd: '<%= config.source %>/img',
        dest: '<%= config.build %>/img',
        src: ['**/*.{png,jpg,gif}']
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['<%= config.source %>/js/script.js']
    },

    sass: {
      options: {
        style: 'expanded'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/scss',
        dest: '<%= config.source %>/css',
        src: '**/*.scss',
        ext: '.css'
      }
    },

    svgmin: {
      options: {

      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/img',
        dest: '<%= config.tmp %>/img',
        src: ['**/*.svg'],
        ext: '.svg',
      }
    },

    // needs some tweaks

    svgstore: {
      options: {
        prefix: 'icon-',
        svg: {
          viewBox: '0 0 100 100'
        },
      },
      default: {
        files: {
          '<%= config.build %>/img/icons.svg': ['<%= config.tmp %>/img/icons/**/*.svg']
        }
      }
    },

    uncss: {
      options: {

      },
      dist: {
        files: {
          '<%= config.build %>/css/styles.css': ['<%= config.source %>/**/*.html']
        }
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= config.build %>'
      },
      html: '<%= config.source %>/**/*.html'
    },

    usemin: {
      html: ['<%= config.build %>/**/*.html']
    },

    uglify: {
      options: {
        beautify: false,
        compress: true,
        mangle: true
      }
      // files : {
      //   cwd: '<%= config.build %>/js',
      //   dest: '<%= config.build %>/js',
      //   expand: true,
      //   src: '**/*.js'
      // }
    },

    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
      },
      html: {
        files: ['<%= config.source %>/**/*.html'],
        tasks: []
      },
      img: {
        files: ['<%= config.source %>/img/**/*.{gif,jpeg,jpg,png}'],
        tasks: []
      },
      js: {
        files: ['<%= config.source %>/js/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['<%= config.source %>/scss/**/*.scss'],
        tasks: ['sass']
      },
      svg: {
        files: ['<%= config.source %>/img/**/*.svg'],
        tasks: ['svgstore']
      }
    }

  });

  grunt.registerTask('default', ['sass', 'autoprefixer', 'connect', 'watch']);
  grunt.registerTask('test', [
    'sass',
    'autoprefixer',
    'csslint',
    'jshint',
    'connect',
    'watch'
  ]);
  grunt.registerTask('build', [
    // 'jshint',
    'clean',
    'copy',
    'sass',
    'autoprefixer',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
    // 'uncss',
    // 'cmq',
    // 'cssmin',
    // 'uglify',
    // 'imagemin',
    // 'svgmin',
    // 'svgstore',
    // 'htmlmin',
    // 'clean:tmp'
  ]);

};
