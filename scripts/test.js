var MongoClient = require('mongodb').MongoClient,
ObjectID = require('mongodb').ObjectID
    , assert = require('assert');



// Connection URL //USERNAME:PASSWORD@DBHOST:DBPORT/DBNAME
var url = 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("branch").find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        for (var i = 0; i < result.length; i++) {
            console.log("test.js, db.collection(branch) "+ result[i]);
        }
    db.close();
    });
});
