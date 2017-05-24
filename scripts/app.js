var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var way = "D:/db/NoSQL";

app.set('view engine', 'ejs');

//helps us get the pictures and css.
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

app.post('/employee',urlencodedParser, function(req, res) {
    console.log(req.body);

    res.render('employee');
});
app.get('/profile/:name', function(req, res) {
    var data = {age: 29, job: "codemonkey", hobbies: ['eating','fighting','and so on']}
    res.render('profile',{person:req.params.name, data: data});
});
app.get('/employee', function(req, res) {
    res.render('employee');
});
app.get('/employer', function(req, res) {
    res.render('employer');
});
app.get('/home', function(req, res) {
    res.render('home');
});
app.get('/locationmanager', function(req, res) {
    res.render('locationmanager');
});
app.get('/memberclub', function(req, res) {
    res.render('memberclub');
});

app.listen(3000);


function getDB(){
    return 'mongodb://212.85.88.103:27017/schoolProject';
}
function testSendToDB(){
    MongoClient.connect(getDB(), function(err, db) {
        if (err) throw err;
        var query = {"name" : "Erol", "lastName": "the Berrol"};
        db.collection("Employee").insert(query, function(err, response){
            if (err) throw err;
            console.log(response);
        });
        db.close();
    });
}
/*function Load(){
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
