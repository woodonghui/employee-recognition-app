// var i18n = require('i18n');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index');
	});

};
