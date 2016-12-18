var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');


var app = express();
var port = process.env.PORT || 3001;
var connectionString = 'postgres://localhost:5432/Todo';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(port, function(){
  console.log('Server is listening on :', port );
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/newItem', function(req, res){
  console.log('hit newItem route');
  //cont to DB
  pg.connect( connectionString, function(err, client, done){
    if( err ){
      console.log(err);
    } else {
      console.log('connected to DB');
      // use wildcards to insert record
      client.query( 'INSERT INTO todolist (item) VALUES ($1)', [req.body.newItem] );
      done();
      res.send('ok');
    }//end if else
  });// end connect
});//end post newItem

app.get('/getList', function(req, res){
  console.log('hit getList route');
  // connect to DB
  pg.connect( connectionString, function( err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('connected to DB');
      var query = client.query( 'SELECT item FROM todolist' );
      //array for list
      var allList = [];
      query.on( 'row', function( row ){
        allList.push (row);
      });
      query.on( 'end', function(){
      done();
      console.log( allList);

      res.send( allList );
      });
    } // end if else
  }); // end connect
}); //end get getlist
