'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            '<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            'Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            'Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            '*/\n',
    config: {
      source: 'source',
      build: 'dist'
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        cwd: '.tmp/concat/css',
        dest: '.tmp/concat/css',
        src: '*.css'
      }
    },

    clean: {
      dist: ['<%= config.build %>'],
      tmp: ['.tmp'],
      sass: ['.sass-cache']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '.tmp/concat/css',
        dest: '.tmp/concat/css',
        src: '*.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          open: true,
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    copy: {
      htaccess: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '.htaccess',
      },
      browserconfig: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: 'browserconfig.xml',
      },
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
      robots: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: 'robots.txt',
      },
      sitemap: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: 'sitemap.xml',
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
      files: ['source/js/**.js']
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

    svgmin: {

    },

    usemin: {
      html: '<%= config.build %>/*.html'
    },

    useminPrepare: {
      html: '<%= config.source %>/*.html'
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: [
          '<%= config.source %>/css/**/*.css'
        ],
        tasks: []
      },
      gruntfile: {
        files: ['gruntfile.js']
      },
      html: {
        files: [
          '<%= config.source %>/**/*.html'
        ],
        tasks: []
      },
      js: {
        files: [
          '<%= config.source %>/js/**/*.js'
        ],
        tasks: []
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
        tasks: [
          'sass'
        ]
      },
      svg: {
        files: [
          '<%= config.source %>/svg/**/*.svg'
        ],
        tasks: []
      }
    }

  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [
    'connect',
    'sass',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
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
    'imagemin',
    'clean:tmp',
    'clean:sass'
  ]);

};
