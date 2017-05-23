
function onLoad(){
    var formBeans = document.getElementById("beans_order");
    formBeans.addEventListener("submit", function(event) {
        event.preventDefault();
        var beans = document.getElementsByName("beans");
        var beanAmount = document.getElementById('amountBeans').value
        for(var i = 0; i < beans.length; i++) {
            if(beans[i].checked == true) {
                bean = beans[i].value;
            }
        }
    }

    var formDrinks = document.getElementById("drink_order");
    formDrinks.addEventListener("submit", function(event) {
        event.preventDefault();
        var drinks = document.getElementsByName("drinks");
        var drinkAmount = document.getElementById('amountDrinks').value
        for(var i = 0; i < beans.length; i++) {
            if(drinks[i].checked == true) {
                drink = drinks[i].value;
            }
        }
    }

    var formMilks = document.getElementById("milk_order");
    formMilks.addEventListener("submit", function(event) {
        event.preventDefault();
        var milks = document.getElementsByName("milks");
        var milkAmount = document.getElementById('amountMilks').value
        for(var i = 0; i < beans.length; i++) {
            if(milks[i].checked == true) {
                milk = milks[i].value;
            }
        }
    }

    var formAdditions = document.getElementById("addition_order");
    formMilks.addEventListener("submit", function(event) {
        event.preventDefault();
        var additions = document.getElementsByName("additions");
        var additionAmount = document.getElementById('amountAdditions').value
        for(var i = 0; i < beans.length; i++) {
            if(additions[i].checked == true) {
                addition = additions[i].value;
            }
        }
        console.log("shit be happening!");
        event.target.submit();
    }


}








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
