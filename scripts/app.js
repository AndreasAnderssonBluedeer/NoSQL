function onLaod(){
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

    var formDrink = document.getElementById("drink_order");
    formBeans.addEventListener("submit", function(event) {
        event.preventDefault();
        var beans = document.getElementsByName("drinks");
        var beanAmount = document.getElementById('amountBeans').value
        for(var i = 0; i < beans.length; i++) {
            if(beans[i].checked == true) {
                bean = beans[i].value;
            }
        }
    }


  var elements = document.getElementById("apply-for-pet").elements;
  if (this.elements.firstname.value.length<=50) {
    isCorrectString+= "Firstname: "+this.elements.firstname.value+"\n";
  }else{
    boo = false;
    notOkString += "Firstname name is too long\n";
  }
  if (this.elements.lastname.value.length<=50) {
    isCorrectString+= "Lastname: "+this.elements.lastname.value+"\n";
  }else{
    boo = false;
    notOkString += "Lastname name is too long\n";
  }
  if (!isNaN(this.elements.age.value)) {
    isCorrectString+= "Age: "+this.elements.age.value+"\n";
  }else{
    boo = false;
    notOkString += "Age is not a number\n";
  }
  if (this.elements.email.value.length<=50) {
    isCorrectString+= "Email: "+this.elements.email.value+"\n";
  }else{
    boo = false;
    notOkString += "Email is too long\n";
  }
  if(boo === false){
    alert(notOkString);
  }else{
    isCorrectString+= "pet "+ selectedPet;
    var r = confirm(isCorrectString);
      if (r === true) {
        event.target.submit();
      }
  }
});
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
