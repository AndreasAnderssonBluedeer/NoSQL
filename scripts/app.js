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
    res.render('employee', {orders: getOrders(), branches:branches});
});
app.post('/clear',urlencodedParser, function(req, res) {
    clearOrder();
    res.render('employee', getOrders());
});
app.post('/send',urlencodedParser, function(req, res) {
    sendOrder();
    res.render('employee', getOrders());
});
app.post('/branch',urlencodedParser, function(req, res) {
    var x = req.body.branch;
    branches = {branches:[]};
    gitEmployees(res, x);
    //res.render('employee', getOrders());
});
app.get('/profile/:name', function(req, res) {
    var data = {hobbies: ['eating','fighting','and so on']}
    res.render('profile',{person:req.params.name, data: data});
});
app.get('/employee', function(req, res) {

    res.render('employee', {orders: getOrders(), branches:branches});
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
    branches = {branches:[]};
    test(res);
});
app.post('/test',urlencodedParser, function(req, res) {
    addToOrder(req.body);
    res.render('employeeChoise', {orders: getOrders(), branches:branches});
});
app.listen(3000);


function getDB(){
    return 'mongodb://bobbytables:mightygoodpwd@212.85.88.103:27017/schoolProject';
}
function sendOrder(){

}
function gitEmployees(res, x){
    fetch.getBranchID(x , res, getEmployees);
}

function test(res) {
    fetch.getAdresses(getBranches, res);
}
function getBranches(ob, res){
    for (var i = 0; i < ob.length; i++) {
        //console.log(ob[i].Address.Street);
        branches.branches.push(ob[i].Address.Street);
    }
    //console.log(branches);
    res.render('employee', {orders: getOrders(), branches:branches});
}
function getEmployees(ob, res) {
    //create function that fetches all the names of employes, or ssn depending on branch.
    for (var i = 0; i < ob.length; i++) {
        console.log(ob[i].ID);
        fetch.getEmployees(ob[i].ID, res, d);
    }
}


function myFunction() {

}
