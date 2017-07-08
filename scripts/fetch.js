var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var obj;
// Connection URL for the database.
function getDB(){
    return 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';
}
//the functions that we want to export to other objects.
module.exports = {
    /*
    function that takes y (branch ID), res to render .ejs files on and x a callback function.
    it serches the employee document for the employees that work at a certain branch ID.
    it returns only the "firstname" from the emplyees. and the result is turnd into an array.
    the result and res are sent back trough the callback function and the connection is closed.
    */
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
    getCompleteEmployeeList: function (res,x){
        MongoClient.connect(getDB(), function(err, db)  {
            if (err) throw err;
            db.collection('employee').find({},{}).toArray(function (err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    },
    getProductsInStock:function(orders, res, x, insDB){
      MongoClient.connect(getDB(), function (err,db) {
          if (err) throw err;
          db.collection('branch').find({"ID":orders.branch},{"ProductsInStock":1}).toArray(function (err,result) {
              if (err) throw err;
              x(result[0].ProductsInStock, res, insDB, orders);
              db.close();
          })

        });
    },
    getEmployer: function(y , res, x){
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("employee").find({"Branch":y}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    },
    /*
    function that takes an callback and a res. fetches the documents in branch
    and passes the respond and the res trough the callback (x).
    */
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
    /*
    function that takes a res. gets the branch adresses and then renders
    locationmanager with the adresses.
    */
    getBranchName(res){
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("branch").find({}).toArray(function(err, result) {
                if (err) throw err;
                var locations = {locations:[]};
                for (var i = 0; i < result.length; i++) {
                    locations.locations.push(result[i].Address.Street);
                }
                console.log(locations);
                res.render('locationmanager', {locations:locations});
                db.close();
            });
        });
    },
    /*
    function that takes an adress parameter (y), res and a callbackfunction (x).
    finds the branch with thge adress and returns the branches id.
    it passes the result and res trough the callback.
    */
    getBranchID: function(y, res, x) {
        MongoClient.connect(getDB(), function(err, db) {
            if (err) throw err;
            db.collection("branch").find({"Address.Street" : y},{"ID":1}).toArray(function(err, result) {
                if (err) throw err;
                x(result, res);
                db.close();
            });
        });
    },
    /*
    function that take a callback function (x) nd res as parameters.
    passes the result from mebersclub and passes them into the callback along with res.
    */
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
