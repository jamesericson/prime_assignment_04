var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(port, function(){
  console.log('Server is listening on :', port );
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
