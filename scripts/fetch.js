var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var orders = {"branches":[]};
// Connection URL for the database.
function getDB(){
    return 'mongodb://212.85.88.103:27017/project';
}
getBranch();
var monkey =[]
function setAdress(object){
    console.log("setAdress in fetch: \nid:"+object.id +" name: "+ object.name+"\n");
    orders.branches.push({id:object.id, street:object.name});
    var o = orders.branches;
    monkey.push({id:object.id, street:object.name});
    console.log("iterating trough order.branches in setAdress: \n");
    for (var i = 0; i < o.length; i++) {
        console.log(o[i]);
    }
}


MongoClient.connect(getDB(), function(err, db) {
    if (err) throw err;
    db.collection("branch").find({}).toArray(function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            setAdress({id:result[i].id, name:result[i].branchaddress.street});
        }
    db.close();
    });
});

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
    console.log(monkey+"getAdresses goes off");
    return monkey;
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
