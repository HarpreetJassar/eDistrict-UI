require.config({
    baseUrl: "",
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': './../../engine/angular.min',
        'angular-route': './../../engine/angular-route.min',
        'angularAMD': './../../engine/angularAMD.min'
    },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },
    
    // kick start application
    deps: ['app']
});