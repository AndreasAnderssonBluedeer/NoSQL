var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL for the database.
function getDB(){
    return 'mongodb://212.85.88.103:27017/project';
}

// Fuction for iterating over key values and nested key values.
function getKeyValue(result){
    var x = result;
    var str = "";
    for (key in x) {
        if (x.hasOwnProperty(key)) {
            if(x[key] == '[object Object]'){
                str = str + key + ": \n";
                var y = x[key];
                for (var i = 0; i < y.length; i++) {
                    str += getKeyValue(y[i]);
                }
            }else{
                str = str + key + " = " + x[key] + "\n";
            }
        }
    }
    return str;
}


// fetching employee data.
function getEmployee(){
    MongoClient.connect(getDB(), function(err, db) {
        if (err) throw err;
        var query = { name : /^M/ };
        db.collection("employee").find({}).toArray(function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
            console.log(getKeyValue(result[i]));
            }
        db.close();
        });
    });
}

// fetching branch data.
function getBranch(){
    MongoClient.connect(getDB(), function(err, db) {
        console.log("");
        if (err) throw err;
        db.collection("branch").find({}).toArray(function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                console.log(getKeyValue(result[i]));
            }
        db.close();
        });
    });
}

// fetching memberclub data:
function getMeberclub(){
    MongoClient.connect(getDB(), function(err, db) {
        console.log("memberclub");
        if (err) throw err;
        db.collection("memberclub").find({}).toArray(function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                console.log(getKeyValue(result[i]));
            }
        db.close();
        });
    });
}

getEmployee();
//update
//MongoClient.connect(url, function(err, db) {
//  if (err) throw err;
//  var myquery = { name : "Harry" };
//  var newvalues = {$set: {name: "Man Beast"} };
//  var myoptions = { multi: true };
//  db.collection("Employee").update(myquery, newvalues, myoptions, function(err, res) {
//    if (err) throw err;
//    console.log(res.result.nModified + " record(s) updated");
//    db.close();
//  });
//});
