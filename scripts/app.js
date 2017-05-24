var http = require("http");
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
function getDB(){
    return 'mongodb://212.85.88.103:27017/schoolProject';
}
var server = http.createServer(function (request, response) {
    if(request.url==='/memberclub.html'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var readStream = fs.createReadStream(__dirname +'/../memberclub.html', 'utf8');
        readStream.pipe(response);
    }else if(request.url==='/employee.html'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var readStream = fs.createReadStream(__dirname +'/../employee.html', 'utf8');
        readStream.pipe(response);
    }else if(request.url==='/employer.html'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var readStream = fs.createReadStream(__dirname +'/../employer.html', 'utf8');
        readStream.pipe(response);
    }else if(request.url==='/locationmanager.html'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var readStream = fs.createReadStream(__dirname +'/../locationmanager.html', 'utf8');
        readStream.pipe(response);
    }else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        var readStream = fs.createReadStream(__dirname +'/../home.html', 'utf8');
        readStream.pipe(response);
    }
});
server.listen(3000);
// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');




function Load(){
    var formBeans = document.getElementById("beans_order");
    formBeans.addEventListener("submit", function(event) {
        event.preventDefault();
        var beans = document.getElementsByName("beans");
        var beanAmount = document.getElementById('amountBeans').value
        var bean;
        for(var i = 0; i < beans.length; i++) {
            if(beans[i].checked == true) {
                bean = beans[i].value;
            }
        }



    });
}
var http = require('http');

function testSendToDB(){
    MongoClient.connect(getDB(), function(err, db) {
        if (err) throw err;
        var query = { "id": new ObjectID(), "name" : "Erol", "lastName": "the Berrol"};
        db.collection("Employee").insert(query, function(err, response){
            if (err) throw err;
            console.log(response);

        });
        db.close();
    });
}
/*
function Load(){
    getMongo();
    var formBeans = document.getElementById("beans_order");
    formBeans.addEventListener("submit", function(event) {
        event.preventDefault();
        var beans = document.getElementsByName("beans");
        var beanAmount = document.getElementById('amountBeans').value
        var bean;
        for(var i = 0; i < beans.length; i++) {
            if(beans[i].checked == true) {
                bean = beans[i].value;
            }
        }
        testSendToDB();
        /*var adder = document.getElementById("adder");
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var t = document.createTextNode("this works now");
        h1.appendChild(t);
        div.appendChild(h1);
        adder.appendChild(div);

    });
}


// Connection URL for the database.





var formDrinks = document.getElementById("drink_order");
formDrinks.addEventListener("submit", function(event) {
    event.preventDefault();
    var drinks = document.getElementsByName("drinks");
    var drinkAmount = document.getElementById('amountDrinks').value
    for(var i = 0; i < beans.length; i++) {
        if(drinks[i].checked == true) {
            drink = drinks[i].value;
        }
    }event.target.submit();
});

var formMilks = document.getElementById("milk_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var milks = document.getElementsByName("milks");
    var milkAmount = document.getElementById('amountMilks').value
    for(var i = 0; i < beans.length; i++) {
        if(milks[i].checked == true) {
            milk = milks[i].value;
        }
    }event.target.submit();
});

var formAdditions = document.getElementById("addition_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var additions = document.getElementsByName("additions");
    var additionAmount = document.getElementById('amountAdditions').value
    for(var i = 0; i < beans.length; i++) {
        if(additions[i].checked == true) {
            addition = additions[i].value;
        }
    }event.target.submit();
});


var formDrinks = document.getElementById("drink_order");
formDrinks.addEventListener("submit", function(event) {
    event.preventDefault();
    var drinks = document.getElementsByName("drinks");
    var drinkAmount = document.getElementById('amountDrinks').value
    for(var i = 0; i < beans.length; i++) {
        if(drinks[i].checked == true) {
            drink = drinks[i].value;
        }
    }event.target.submit();
});

var formMilks = document.getElementById("milk_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var milks = document.getElementsByName("milks");
    var milkAmount = document.getElementById('amountMilks').value
    for(var i = 0; i < beans.length; i++) {
        if(milks[i].checked == true) {
            milk = milks[i].value;
        }
    }event.target.submit();
});

var formAdditions = document.getElementById("addition_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var additions = document.getElementsByName("additions");
    var additionAmount = document.getElementById('amountAdditions').value
    for(var i = 0; i < beans.length; i++) {
        if(additions[i].checked == true) {
            addition = additions[i].value;
        }
    }event.target.submit();
});
*/
