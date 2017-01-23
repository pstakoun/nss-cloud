var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/guests', function(req, res) {
	exec('./list-guests.sh', function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('error: ' + error);
		}
		res.render('guests', { list: stdout });
	});
});

app.get('/guests/create', function(req, res) {
	res.render('guests-create');
});

app.post('/guests/create', function(req, res) {
	if (!(req.body.email && req.body.name)) {
		res.send('ERROR');
		return;
	} 
	exec('./create-guest.sh ' + req.body.email.replace(/\s+/g, '-').toLowerCase() + ' ' + req.body.name.replace(/\s+/g, '-').toLowerCase(), function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('error: ' + error);
		}
	});
	res.send('Guest VM created.');
});

app.listen(80, function() {
	console.log('App listening on port 80...');
});
