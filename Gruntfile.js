module.exports = function(grunt){
 /*grunt.registerTask('hello', function(){
  console.log('Hello There');
 });
 
 grunt.registerTask('goodbye', function(){
  console.log('Goodbye There');
 });
 
 grunt.registerTask('default', ['hello','goodbye']);*/
 
 grunt.initConfig({
  concat: {
    js_top: {
      src: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/leaflet/leaflet.js'
      ],
      dest: 'src/js/scripts_top.js',
    },
    js_bottom: {
      src: [
        'src/js/map.js'
      ],
      dest: 'src/js/scripts_bottom.js',
    },
    css: {
      src: [
        'src/css/map.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/leaflet/leaflet.css'
      ],
      dest: 'src/css/styles.css',
    },
  },
  uglify: {
    js: {
      files: {
        'build/js/scripts_top.min.js': ['src/js/scripts_top.js'],
        'build/js/scripts_bottom.min.js': ['src/js/scripts_bottom.js']
      }
    },
    css: {
      files: {
        'build/css/styles.min.js': ['src/css/styles.css']
      }
    }
  }
 });
 
 grunt.loadNpmTasks('grunt-contrib-concat');
 grunt.loadNpmTasks('grunt-contrib-uglify');

};
