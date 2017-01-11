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

app.get('/admin', function(req, res) {
	exec('./list-guests.sh', function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('error: ' + error);
		}
		res.render('admin', { list: stdout });
	});
});

app.get('/create', function(req, res) {
	res.render('create');
});

app.post('/create', function(req, res) {
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
