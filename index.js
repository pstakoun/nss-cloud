var express = require('express');
var app = express();
var exec = require('child_process').exec;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/admin', function(req, res) {
	res.render('admin');
});

app.get('/create', function(req, res) {
	res.render('create');
});

app.post('/create', function(req, res) {
	exec('./create_guest.sh', function(error, stdout, stderr) {
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
