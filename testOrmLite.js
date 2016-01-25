var ormlite = require('./module/src/ormlite.js');

var connectionString = "postgres://postgres:sergtsop@localhost:5432/postgres";

var allTableData;
var specificData;
var count = 0;

ormlite.initialize(connectionString, function(connectedClient){

	ormlite.getAll('test_user', function(tableArray){
		console.log(tableArray);
		allTableData = tableArray;
		finishUp();
	});

	ormlite.findByID('test_user', 3, function(tableObject){
		console.log(tableObject);
		var specificData = tableObject;
		finishUp();
	});

	function finishUp(){
		count++
		if(count == 2){
			console.log("Done!");
			ormlite.deinitialize();
		}
	}

});