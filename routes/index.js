
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});

	app.get('/logout', function(req, res) {
		// todo logout 
		res.redirect('/');
	});

};
