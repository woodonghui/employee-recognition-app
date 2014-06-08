
module.exports = function(app) {


	app.post('/users/create', function(req, res) {
		//todo: create a user document and save into the database
	});

	app.get('/users', function(req, res) {
		res.send('list all the users');		
	});

	app.get('/recognize', function(req, res) {
		res.send('to make a recognize');		
	});

	app.post('/recognize', function(req, res) {
		res.send('to make a recognize');		
	});

	app.get('/recognitions-given', function(req, res) {
		res.send('recognitions given to peers');		
	});

	app.get('/my-recognitions', function(req, res) {
		res.send('recognitions received from peers');		
	});

	app.get('/rewards', function(req, res) {
		res.send('redeem the points');		
	});

};