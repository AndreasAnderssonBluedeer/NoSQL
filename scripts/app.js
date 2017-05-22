var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://212.85.88.103:27017/andreasTest';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    insertDocuments(db, function() {
        db.close();
    });
});

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('smask');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}