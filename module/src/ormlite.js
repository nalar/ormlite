var pg = require('pg');

//var connectionString = "postgres://postgres:sergtsop@localhost:5432/postgres";

var connectedClient;
var doneClient;

function initialize(connectionString, onComplete){
	// Takes in connection string and connects 
	// to the specified database
	pg.connect(connectionString, function (err, client, done){
		if(err){throw err};
		connectedClient = client;
		doneClient = done;
		onComplete(client);
	});
};

function getAll(tableName, onComplete){
	// Takes in name of table and returns its
	// contents as an array
	var tableArray;
	
	connectedClient.query('select * from ' + tableName + ';', function (err, result){
		if(err){throw err};
		tableArray = result.rows;
		onComplete(tableArray);
	});
};

function findByID(tableName, ID, onComplete){
	// Takes in two parameters: table name and ID
	// and returns an object with a row in that
	// table
	
	connectedClient.query('select * from ' + tableName + ' where id = ' + ID + ';', function (err, result){
		if(err){throw err};
		tableObject = result.rows;
		onComplete(tableObject);
	});
};

function deinitialize(){
	doneClient();
	pg.end();
};

module.exports = {
	initialize: initialize,
	getAll: getAll,
	findByID: findByID,
	deinitialize: deinitialize
};