var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var obj;
// Connection URL for the database.
function getDB(){
    return 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';
}
module.exports = {
    getEmployee: function(y , res, x){
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("employee").find({"Branch":y},{"firstname":1}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    },
    getAdresses(x, res){
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("branch").find({}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    },
    getBranchID: function(y, res, x) {
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("branch").find({"Address.Street" : y},{"ID":1}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res, setBranchID);
                db.close();
            });
        });
    },
    getMeberclub: function(x, res){
        MongoClient.connect(getDB(), function(err, db) {
            console.log("memberclub");
            if (err) throw err;
            db.collection("memberclub").find({}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    }
}

/*
function getKeyValue(result){
    var x = result;
    var str = "";
    for (key in x) {
        if (x.hasOwnProperty(key)) {
            if(Array.isArray(x[key])){
                str = str + key + ": \n";
                var a = x[key];
                for (var i = 0; i < a.length; i++) {
                    str += getKeyValue(a[i]);
                }
            }else if(typeof x[key]===Object){
                console.log(Object.prototype.toString.call(x[key]));
                str = str + key + ": \n";
                var y = x[key];
                for (var i = 0; i < y.length; i++) {
                    str += getKeyValue(y[i]);
                }
            }else{
                 //console.log(key + " = " + x[key]);
                str = str + key + " = " + x[key] + "\n";
            }
        }
    }
    return str;
}
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
*/
