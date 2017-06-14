var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var branches = {branches:[]};
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var way = "D:/db/NoSQL";
var fetch = require('./fetch.js');
var orders = {orders:[]};
var branch;
app.set('view engine', 'ejs');
function addToOrder(object, res){
    orders.orders.push({name:object.name, amount:object.amount});
    console.log("app.js, addToOrder, the object passed trough as a parameter:\n"+orders);
    res.render('cashier', {cashier: orders.cashier, orders: getOrders()});
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
    console.log("app.js, post, employee");
    addToOrder(req.body);
    res.render('employee', {orders: getOrders(), branches:branches});
});
app.post('/clear',urlencodedParser, function(req, res) {
    console.log("app.js, post, clear");
    clearOrder();
    res.render('cashier', getOrders());
});
app.post('/send',urlencodedParser, function(req, res) {
    console.log("app.js, post, send");
    sendOrder();
    res.render('cashier', getOrders());
});
app.post('/branch',urlencodedParser, function(req, res) {
    console.log("app.js, post, branch");
    fetch.getBranchID(req.body.branch , res, getEmployees);
});
app.post('/cashier',urlencodedParser, function(req, res) {
    console.log("app.js, post, cashier, chosen cashier:\n"+req.body.cashier);

    orders = {cashier:req.body.cashier, orders:[]};
    res.render('cashier', {cashier: orders.cashier, orders: getOrders()});
});
app.get('/profile/:name', function(req, res) {
    var data = {hobbies: ['eating','fighting','and so on']}
    res.render('profile',{person:req.params.name, data: data});
});
app.get('/employee', function(req, res) {
    console.log("app.js, get, employee");
    branches = {branches:[]};
    fetch.getAdresses(getBranches, res);
});
app.get('/employer', function(req, res) {
    console.log("app.js, get, employer");
    res.render('employer');
});
app.get('/home', function(req, res) {
    console.log("app.js, get, home");
    res.render('home');
});
app.get('/', function(req, res) {
    console.log("app.js, get, /");
    res.render('home');
});
app.get('/locationmanager', function(req, res) {
    console.log("app.js, get, locationmanager");
    res.render('locationmanager');
});
app.get('/memberclub', function(req, res) {
    console.log("app.js, get, memberclub");
    res.render('memberclub');
});
app.get('/test', function(req, res) {
    console.log("app.js, get, test");
    branches = {branches:[]};
    test(res);
});
app.post('/test',urlencodedParser, function(req, res) {
    console.log("app.js, post, test");
    addToOrder(req.body);
    res.render('employeeChoice', {orders: getOrders(), branches:branches});
});
app.post('/addToOrder',urlencodedParser, function(req, res) {
    console.log("app.js, post, addToOrder");
    addToOrder(req.body, res);
});
app.listen(3000);


function getDB(){
    return 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';
}
function sendOrder(){

}
function setBranchID(ob){
    orders.branchID = ob;
}

function getBranches(ob, res){
    var branches = {branches:[]};
    for (var i = 0; i < ob.length; i++) {
        branches.branches.push(ob[i].Address.Street);
    }
    res.render('employee', {orders: getOrders(), branches:branches});
}
function getEmployees(ob, res, orders) {
    //create function that fetches all the names of employes, or ssn depending on branch.
    for (var i = 0; i < ob.length; i++) {
        console.log("app.js, loop in getEmployees, ID of the object being loopt trough:\n"+ ob[i].ID);
        fetch.getEmployee(ob[i].ID, res, makeEmployeeList);

    }
}


function makeEmployeeList(ob, res) {
    var list = {employees: []};
    for (var i = 0; i < ob.length; i++) {
        list.employees.push(ob[i].firstname);
    }
    res.render('employeeChoice', {orders: getOrders(), employees:list});
}
