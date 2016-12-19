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
      var query = client.query( 'SELECT * FROM todolist ORDER BY completed, importance DESC, id' );
      //array for list
      var allList = [];
      query.on( 'row', function( row ){
        allList.push (row);
      });
      query.on( 'end', function(){
      done();
      // console.log( allList);

      res.send( allList );
      });
    } // end if else
  }); // end connect
}); //end get getlist

app.post('/updateStatus', function(req, res){
  console.log('hit updateStatus route/ recieved id: ', req.body.id);
  //cont to DB
  pg.connect( connectionString, function(err, client, done){
    if( err ){
      console.log(err);
    } else {
      console.log('connected to DB');
      // use wildcards to insert record
      var query = client.query( 'Select completed FROM todolist WHERE id = ' + [req.body.id] + ';' );
      query.on('row',  function (row){
        console.log('this is the what it\'s checking: ', row.completed);
        if(row.completed == true){
          console.log('it was true... now it should be false');
          client.query( 'UPDATE todolist SET completed=FALSE WHERE id= ' + [req.body.id] + ';' );
        } else {
          console.log('it was else... ?');
          client.query( 'UPDATE todolist SET completed=TRUE WHERE id= ' + [req.body.id] + ';' );
        } // end nested if else
        done();
        res.send('ok');
      }); // end query.on
    }//end if else
  });// end connect
});//end post newItem

app.post('/changeRank', function(req, res){
  console.log('hit changeRank route/ recieved id:', req.body.id);
  //cont to DB
  pg.connect( connectionString, function(err, client, done){
    if( err ){
      console.log(err);
    } else {
      console.log('connected to DB');
      // use wildcards to insert record
      var query = client.query( 'SELECT importance FROM todolist WHERE id = ' + [req.body.id] + ';' );
      query.on('row',  function (row){
        console.log('this is the what it\'s checking: ', row.importance);

        switch (row.importance) {
          case 1:
            console.log('it was equal to 1: now it should be 2');
            client.query( 'UPDATE todolist SET importance=\'2\' WHERE id = ' + [req.body.id] + ';' );
            break;
          case 2:
            console.log('changing importance to 3');
            client.query( 'UPDATE todolist SET importance=\'3\' WHERE id = ' + [req.body.id] + ';' );
            break;
          case 3:
            console.log('changing importance to 4');
            client.query( 'UPDATE todolist SET importance=\'4\' WHERE id = ' + [req.body.id] + ';' );
            break;
          default:
            console.log('changing importance back to 1');
            client.query( 'UPDATE todolist SET importance=\'1\' WHERE id = ' + [req.body.id] + ';' );
        }// end switch
        done();
        res.send('ok');
      }); // end query.on
    }//end if else
  });// end connect
});//end post newItem

app.post('/delete', function(req, res){
  console.log('hit delete route/ recieved id: ', req.body.id);
  //cont to DB
  pg.connect( connectionString, function(err, client, done){
    if( err ){
      console.log(err);
    } else {
      console.log('connected to DB');
      // use wildcards to insert record
      client.query( 'DELETE FROM todolist WHERE id=' + [req.body.id] + ';' );
      done();
      res.send('ok');
    }//end if else
  });// end connect
});//end post newItem
