var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var express = require('express');
var sync = require('synchronize');
var app = express();
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var way = "D:/db/NoSQL";
var fetch = require('./fetch.js');
var orders = {orders:[]};
var branch;
app.set('view engine', 'ejs');
function addToOrder(object){
    orders.orders.push({name:object.name, amount:object.amount});
    console.log(orders);
}


function getOrders(){
    return orders;
}
function clearOrder(){
    orders = {orders:[]};
}

//helps us get the pictures and css.
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

app.post('/employee',urlencodedParser, function(req, res) {
    addToOrder(req.body);

    res.render('employee', getOrders());
});
app.post('/clear',urlencodedParser, function(req, res) {
    clearOrder();
    res.render('employee', getOrders());
});
app.post('/send',urlencodedParser, function(req, res) {
    sendOrder();
    res.render('employee', getOrders());
});
app.get('/profile/:name', function(req, res) {
    var data = {hobbies: ['eating','fighting','and so on']}
    res.render('profile',{person:req.params.name, data: data});
});
app.get('/employee', function(req, res) {

    res.render('employee', {orders: getOrders(), branch: fetch.getAdresses()});
});
app.get('/employer', function(req, res) {
    res.render('employer');
});
app.get('/home', function(req, res) {
    res.render('home');
});
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/locationmanager', function(req, res) {
    res.render('locationmanager');
});
app.get('/memberclub', function(req, res) {
    res.render('memberclub');
});
app.get('/test', function(req, res) {
    test();
});

app.listen(3000);

function getBranches(){
    console.log("from method getBranches in app.js: \n"+ fetch.getAdresses());
}
function getDB(){
    return 'mongodb://212.85.88.103:27017/project';
}
function sendOrder(){

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

function test() {
    var b = fetch.getAdresses();
    for (x in b){
        console.log(x);
    }
}








/*
function test() {
    branch = {branches:[]};
    var b = fetch.getAdresses();
    branch.branches.push({id:b.id ,adress: b.branchaddress.street});
    console.log(branch);
}


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
/*
function removeItems(){
  var buttons = document.getElementsByClassName("remove-list-item");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      var r = confirm("Remove this button?");
        if (r == true) {
          this.parentNode.removeChild(this);
        }
    });
  }
}
function addListItem(object){
  var ul = document.getElementById("orderItems");
  var li = document.createElement("li");
  var button = document.createElement("button");
  button.className = "remove-list-item";
  li.appendChild(document.createTextNode(object));
  li.appendChild(button);
  ul.appendChild(li);

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
