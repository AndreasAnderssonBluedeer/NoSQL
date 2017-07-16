/**
 * Created by Andreas on 22/5/17.
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;



// Connection URL //USERNAME:PASSWORD@DBHOST:DBPORT/DBNAME
var url = 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';

var order= [{"productid":123,"amount":3},
            {"productid":400,"amount":1}];
//createOrder(123,order,"901112-1010");

//createNewMember("Albus","Dumbledore","340310-1423","Principal","Hogwartz drive 32",
//"1111","Hogsmead","United Kingdom","Ireland",false);

//createComment("901112-1010","780711-4398","Mouhahah.");

var order2=[{"productid":"5924790ebf0ae68543700e7f","amount":1}];

//updateStock(123,order2);

//Create methods

//Auto_inc order ID, receives array with products and amount i.e [{"productID":productID,"amount":amount},
// {"productID":productID,"amount":amount},..etc] //Could add Total sum here later.
function createOrder(branchID,orderlist,cashierID){
    updateStock(branchID,orderlist);    //Update the branch's stock.
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected successfully to server");
        var collection = db.collection('branch');
        collection.updateOne(
            {"id":branchID}, {$push:{"order":{"id":new ObjectID(),"servedby":cashierID, "orderdate": new Date(),orderitems:orderlist}}},{upsert:false});
        console.log("Success");
        db.close();
    });
}
//Creates a new member in the memberClub including creating a new card. Card counter = 0, Barcode auto_inc
function createNewMember(firstname,lastname,ssn,occupation,street,zip,city,country,regCountry,isEmployee){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected successfully to server");
        var collection = db.collection('memberclub');
        collection.insertOne(
            {"firstname":firstname,"lastname":lastname,"ssn":ssn,"occupation":occupation,"address":{"street":street,
            "zip":zip,"city":city,"country":country},
            "card":{"barcode":new ObjectID(),"counter":0,"registrationcountry":regCountry,"discount":isEmployee}});
        console.log("Success");
        db.close();
    });
}
//creates a comment about an employee
function createComment2(employeeID,employerID,comment,res){
    if (comment.length>300){
        console.log("ERROR, comment exceeds maximum character limit(300).")
    }else {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log("Connected successfully to server");
            var collection = db.collection('employee');
            collection.updateOne(
                {"employeeID": employeeID}, {
                    $push: {
                        "comments": {
                            "commentId": new ObjectID(),
                            "comment": comment,
                            "date": new Date(),
                            "author": employerID
                        }
                    }
                }, {upsert: false});
            console.log("Success");
            res.render('successComment');
            db.close();
        });
    }
}
//Update Methods
//Update stock for a specific branch. Directly called from the createOrder method.
function updateStock(branchID,orderlist){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected successfully to server");
        var collection = db.collection('branch');
        for(var i=0;i<orderlist.length;i++){

        collection.updateOne(
            {"id":branchID,"products.productid":ObjectID(orderlist[i].productid)}, {$inc:{"products.$.quantity":-orderlist[i].amount}},{upsert:false});
        console.log("Updated item "+i);
        }
        console.log("Success");
        db.close();
    });
}
// these functions are exporst so we can reach them in other js files.
module.exports = {
    updateStock: function(orders, ob, res, cbnr2, cbnr3, insDB){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("branch").update({"ID" : orders.branch}, {$set : {"ProductsInStock" : ob }}, function(err, res2) {
                if (err) throw err;
                cbnr2(res, res2, orders, cbnr3, insDB);
                db.close();
            });
        });
    },
    /*
    This function inserts the order made, it finds the ID that exist in our order object
    and serches for the matching document in the branch collection.
    We push a new order object on to that ducument.
    use our callback to send the res from cashier.ejs and the result (res2) from
    the databse back to app.js.
    */
    insertOrder: function(res, order, cbnr3){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("branch").update({"ID" : order.branch}, {"$push" : {"Order":{
			"orderList": order.orders,
			"OrderDate" : new Date(),
            "cashier": order.cashier
        }}}, function(err, res2) {
                if (err) throw err;
                cbnr3(res, res2, order);
                db.close();
            });
        });
    },
    //creates a comment about an employee
    createComment: function(employeeID,employerID,comment,res){
    if (comment.length>300){
        console.log("ERROR, comment exceeds maximum character limit(300).")
    }else {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log("Connected successfully to server");
            var collection = db.collection('employee');
            collection.updateOne(
                {"employeeID": ObjectId(employeeID) }, {
                    $push: {
                        "comments": {
                            "commentId": new ObjectId(),
                            "date": new Date(),
                            "comment": comment,
                            "employerID": employerID
                        }
                    }
                }, {upsert: false});
            console.log("Success");
            res.render('successComment');
            db.close();
        });
    }
},
    //function that inserts a new member to the memberclub.
    insertMember: function(inObject, res, anotherCallBack){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("memberclub").insertOne({
                "firstname": inObject.fname,
                "lastname": inObject.lname,
                "ssn": inObject.ssn,
                "occupation": inObject.occupation,
                "address":{
                    "street": inObject.address,
                    "zip": inObject.zip,
                    "city": inObject.city,
                    "country": inObject.country
                },
                "card":{
                    "barcode":new ObjectID(),
                    //dont know what this is good for? (counter).
                    "counter":0,
                    "registrationcountry":inObject.regCountry,
                    "discount":inObject.isEmployee
                }
            }, function(err, res2) {
                if (err) {
                    anotherCallBack(res, res, true, inObject.fname)
                }else{
                    anotherCallBack(res, res2, false, inObject.fname);
                    db.close();
                };
            });
        });
    },
    //a test function for the database.
    test: function(res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("branch").update({"ID" : "1"}, {"$push" : {"Order":{
			"ID" : "8",
			"OrderItem" : "Brewed Coffee",
			"Amount" : "2",
			"OrderDate" : new Date()
        }}}, function(err, res2) {
                if (err) throw err;
                res.send(res2);
                db.close();
            });
        });
    }

}
