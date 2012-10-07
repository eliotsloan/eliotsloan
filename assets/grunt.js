// Gruntfile for Theme: jonschlinkert

module.exports = function(grunt) {
  'use strict';
  
  // Project configuration
  grunt.initConfig({

    pkg: '<json:package.json>',
    meta: {
      banner: 
        '/* ==========================================================\n' +
        ' * <%= pkg.type %>-<%= pkg.name %> v<%= pkg.version %> \n' +
        ' * Website: <%= pkg.homepage %>\n' +
        ' * \n' +
        ' * Built <%= grunt.template.today("yyyy-mm-dd") %> with grunt v<%= grunt.version %>\n' +
        '/* ==========================================================\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= _.pluck(pkg.licenses,"type").join(", ") %> <%= _.pluck(pkg.licenses,"url").join(", ") %>\n' +
        ' * \n' +
        '/* ==========================================================\n' +
        ' */'
    },

    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Paths
    // -----

    // Twitter Bootstrap
    bootstrap: {
      less:     'less/bootstrap',
      js:       'js/bootstrap'
    },

    // Sellside Toolkit
    toolkit: {
      base:     '../../', 
      less:     '../../less',
      js:       '../../js'
    },

    // Theme
    project: {
      includes: 'assets/includes/',
      pages:    'assets/pages/',
      less:     'assets/less',
      css:      'assets/css',
      img:      'assets/img',
      js:       'assets/js'
    },

    // Concatenate 
    // -----------

    concat: {

      // JavaScripts
      scripts: {
        src:  ['<%= bootstrap.js %>/bootstrap.min.js', '<%= bootstrap.js %>/application.js', '<%= bootstrap.js %>/google-code-prettify/prettify.js', '<%= project.js %>/project.js'],
        dest: 'assets/js/<%= pkg.name %>.js'
      },

      // HTML Pages
      home: {
        src: ['<%= project.includes %>/head.html', '<%= project.pages %>/index.html','<%= project.includes %>/footer.html'],
        dest: 'index.html'
      },
      about: {
        src: ['<%= project.includes %>/head.html', '<%= project.pages %>/about.html','<%= project.includes %>/footer.html'],
        dest: 'about.html'
      },      
      blog: {
        src: ['<%= project.includes %>/head.html', '<%= project.pages %>/blog.html','<%= project.includes %>/footer.html'],
        dest: 'blog.html'
      },
      contact: {
        src: ['<%= project.includes %>/head.html', '<%= project.pages %>/contact.html','<%= project.includes %>/footer.html'],
        dest: 'contact.html'
      },
      projects: {
        src: ['<%= project.includes %>/head.html', '<%= project.pages %>/projects.html','<%= project.includes %>/footer.html']
        dest: 'projects.html'
      }
    },

    // Less
    less: {
      theme: {
        options: {
          paths: ['<%= project.less %>'], // alternate include paths for imports, such as variables
          yuicompress: false,
          compress: false
        },
        files: {
          "<%= project.css %>/<%= project.name %>.css": ['<%= toolkit.less %>/one.less', '<%= toolkit.less %>/two.less'],
          "<%= project.css %>/<%= project.name %>.css": ['<%= toolkit.less %>/one.less', '<%= toolkit.less %>/two.less']
        }
      }
    },

    // Watch
    // -----

    watch: {
      files: ['assets/**/*.*'], // 'less/.*\.less'
      tasks: 'concat less'
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('node_modules/tasks');

  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');

  // grunt.registerTask('test', 'clean less nodeunit');
  grunt.registerTask('test', 'less nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'concat less');

};