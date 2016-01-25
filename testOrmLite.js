var ormlite = require('./module/src/ormlite.js');								// Require orm-lite

var connectionString = "postgres://postgres:sergtsop@localhost:5432/postgres";	// Define the connection string

var allTableData;	// Empty var
var specificData;	// Empty var
var count = 0;		// Count used to determine end

ormlite.initialize(connectionString, function(connectedClient){			// Call ormlite.initialize to initialize database connection

	ormlite.getAll('test_user', function(tableArray){					// Get all entries in table test_user
		console.log(tableArray);
		allTableData = tableArray;
		finishUp();
	});

	ormlite.findByID('test_user', 3, function(tableObject){				// Get entry with id 3 in table test_user
		console.log(tableObject);
		var specificData = tableObject;
		finishUp();
	});

	function finishUp(){
		count++
		if(count == 2){
			console.log("Done!");
			ormlite.deinitialize();										// Call the de-initialize function
		}
	}

});