var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL för databasen
var url = 'mongodb://212.85.88.103:27017/project';



// In this function we connect to "employee" ang get the document

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { name : /^M/ };
  db.collection("employee").find({}).toArray(function(err, result) {
    if (err) throw err;
    //for every position in the document we go trough every post.
    for (var i = 0; i < result.length; i++) {
        //to print a specific part of the document we
        //can reach it like this
        console.log(result[i].firstname);
        //if we have an agregated position we run it trough
        //a loop again after we fetch it out of the respons.
        var x = result[i].comments;
        console.log(x)
        for (var i = 0; i < x.length; i++) {
            console.log(x[i].comment);
        }
    }
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
    console.log("");
    if (err) throw err;
    db.collection("branch").find({}).toArray(function(err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
        console.log("");
        console.log(result[i]);
        console.log("");
        console.log(result[i].order);
        console.log("");
        console.log(result[i].products);
        console.log("");
        console.log(result[i].productshistory);
    }
    //console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
    console.log("memberclub");
    if (err) throw err;
    db.collection("memberclub").find({}).toArray(function(err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
        console.log("här");
        console.log(result[i]);
    }
    //console.log(result);
    db.close();
  });
});



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
