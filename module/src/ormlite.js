// Define requires
var pg = require('pg');

// Define empty vars for use later on
var connectedClient;	// This will contain the client that is connected
var doneClient;			// This will contain the done function of the client

function initialize(connectionString, onComplete){					// Define function initialize
	// Takes in connection string and connects 
	// to the specified database
	pg.connect(connectionString, function (err, client, done){		// Connect to the postgres database
		if(err){throw err};											// Error handler
		connectedClient = client;									// Define the connected client
		doneClient = done;											// Define the done function
		onComplete(client);											// Pass the client on to the callback
	});
};

function getAll(tableName, onComplete){								// Define function getAll
	// Takes in name of table and returns its
	// contents as an array
	var tableArray;													// Create an empty var to hold the results
	
	connectedClient.query('select * from ' + tableName + ';', function (err, result){	// Query the database for everything in table tableName
		if(err){throw err};																// Error handler
		tableArray = result.rows;														// Store the table's rows in tableArray
		onComplete(tableArray);															// Pass on tableArray to the callback
	});
};

function findByID(tableName, ID, onComplete){						// Define function findByID
	// Takes in two parameters: table name and ID
	// and returns an object with a row in that
	// table
	
	connectedClient.query('select * from ' + tableName + ' where id = ' + ID + ';', function (err, result){		// Query the database for ID in tableName
		if(err){throw err};				// Error handler
		tableObject = result.rows;		// Return the results to tableObject
		onComplete(tableObject);		// Pass on tableObject to the callback
	});
};

function deinitialize(){	// Define function de-initialize
	doneClient();			// Call the done function
	pg.end();				// End all pg connections
};

// Define the module's exports
module.exports = {
	initialize: initialize,
	getAll: getAll,
	findByID: findByID,
	deinitialize: deinitialize
};