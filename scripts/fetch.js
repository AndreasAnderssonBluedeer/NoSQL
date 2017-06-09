var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var obj;
var sync = require('synchronize');
// Connection URL for the database.
function getDB(){
    return 'mongodb://212.85.88.103:27017/project';
}

var monkey =[]
function setAdress(object){
    obj = object
    console.log("setAdress in fetch: \n"+obj);
}

function getadd() {
    console.log("here");
    MongoClient.connect(getDB(), function(err, db) {
        if (err) throw err;
        db.collection("branch").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(res);
            for (var i = 0; i < result.length; i++) {
                setAdress(result[i]);
                console.log("fetch.js, db.collection(branch) "+ result[i]);
            }
        db.close();
        });
    });
}

module.exports = {
    getEmployee: function(){
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            var query = { name : /^M/ };
            db.collection("employee").find({}).toArray(function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    //console.log(getKeyValue(result[i]));
                }
            db.close();
            });
        });
    },
    getAdresses(){
        getadd();
        console.log("fetch.js, module.exports, getAdresses(): \n"+obj);
        return obj;
    },
    getMeberclub: function(){
        MongoClient.connect(getDB(), function(err, db) {
            console.log("memberclub");
            if (err) throw err;
            db.collection("memberclub").find({}).toArray(function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    console.log (result[i]);
                    //console.log(getKeyValue(result[i]));
                }
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
