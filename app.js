var fs = require('fs');
var express = require('express');
var app = express();
var busboy = require('connect-busboy');
app.use(busboy());

var port = 3000;
app.listen(port);
console.log('Server listening on port ' + port);

app.get('/', function(request, response) {
	fs.readFile('upload.html',function (err, data) {
		if (err) { console.log(err); }
	    response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	    response.write(data);
    	response.end();
	});
});

app.post('/upload',function(request,response) {
	var fstream;
    request.pipe(request.busboy);
    request.busboy.on('file', function(fieldname, file, filename) {
    	console.log('Uploading: ' + filename);
    	fstream = fs.createWriteStream('./tehFiles/' + filename);
    	file.pipe(fstream);
    	fstream.on('close', function() {
    		response.redirect('back');
    	});
    });
});