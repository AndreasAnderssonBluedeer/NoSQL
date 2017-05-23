/**
 * Created by Andreas on 22/5/17.
 */

var MongoClient = require('mongodb').MongoClient,
ObjectID = require('mongodb').ObjectID
    , assert = require('assert');



// Connection URL
var url = 'mongodb://212.85.88.103:27017/project';

//var order= [{"productid":123,"amount":3},
  //  {"productid":400,"amount":1}];
//createOrder(123,order,"901112-1010");

createNewMember("Albus","Dumbledore","340310-1423","Principal","Hogwartz drive 32",
"1111","Hogsmead","United Kingdom","Ireland",false);

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
function createComment(employeeID,employerID,comment){
    if (comment.length>300){
        console.log("ERROR, comment exceeds maximum character limit(300).")
    }else {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log("Connected successfully to server");
            var collection = db.collection('employee');
            collection.updateOne(
                {"id": employeeID}, {
                    $push: {
                        "comments": {
                            "id": new ObjectID(),
                            "comment": comment,
                            "date": new Date(),
                            "author": employerID
                        }
                    }
                }, {upsert: false});
            console.log("Success");
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

