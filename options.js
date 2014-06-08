module.exports = {
  appDir: 'public',
  baseUrl: 'js/',
  mainConfigFile: 'public/js/common.js',
  dir: 'www-release',
  modules: [
    // First set up the common build layer.
    {
      // module names are relative to baseUrl
      name: 'common',
      // List common dependencies here. Only need to list
      // top level dependencies, 'include' will find
      // nested dependencies.
      include: [
        'jquery',
        'gumby',
        'gumbynavbar',
        'jqueryvalidation'
      ]
    },

    // Now set up a build layer for each main layer, but exclude
    // the common one. If you're excluding a module, the excludee
    // must appear before the excluder in this file. Otherwise it will
    // get confused.
    {
      name: 'app/signup/main-signup',
      exclude: ['common']
    },

  ]
};