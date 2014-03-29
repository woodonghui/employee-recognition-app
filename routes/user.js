
module.exports = function(app) {

	app.get('/users', function(req, res) {
		res.send('list all the users');		
	});

};