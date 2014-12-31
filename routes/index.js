var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    console.log('Uploading: ' + filename);
    fstream = fs.createWriteStream('./tmp/' + filename);
    file.pipe(fstream);
    fstream.on('close', function() {
      console.log('Uploaded to ' + fstream.path);
      res.redirect('/');
    });
  });
});

module.exports = router;