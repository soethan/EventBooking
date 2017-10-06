//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'app/bower_components/jasmine-core/lib/jasmine-core/jasmine.js',
      'app/bower_components/jasmine-core/lib/jasmine-core/jasmine-html.js',
      'app/bower_components/jasmine-core/lib/jasmine-core/boot.js',
      'app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/lib/angular-resource.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'app/bower_components/ngstorage/ngstorage.js',
      'app/vendor/jquery/jquery.min.js',
      'app/vendor/popper/popper.js',
      'app/vendor/bootstrap/js/bootstrap.min.js',

      'app/app.js',
      'app/app.controller.js',
      'app/data/eventsMock.js',
      'app/common/directives/*.js',
      'app/common/services/*.js',
      'app/login/login.controller.js',
      'app/register/register.controller.js',
      'app/register/register.controller.spec.js',
      'app/myevents/myevents.controller.js',
      'app/events/eventdetails.controller.js',
      'app/events/eventlist.controller.js'
    ],

    // web server port
    port: 9000,

    autoWatch: true,

    frameworks: ['jasmine'],

    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    singleRun: true
  });
};
