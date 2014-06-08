requirejs.config({
	baseUrl: './js',
	paths: {
		'jquery': 'libs/jquery-2.0.2.min',
		'gumby': 'libs/gumby',
		'gumbynavbar': 'libs/ui/gumby.navbar',
		'jqueryvalidation': 'libs/ui/jquery.validation'
	},
	shim: {
        'gumby': {
            deps: ['jquery'], //Shim to ensure jquery is loaded first
            exports: 'Gumby'
        },
        'gumbynavbar': ['jquery','gumby'],
        'jqueryvalidation': ['jquery','gumby']
    }
});