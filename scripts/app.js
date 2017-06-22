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
var insertDB = require('./insertAndUpdate.js');
var orders = {cashier:"",branch:"", orders:[]};
var branch;
app.set('view engine', 'ejs');
function addToOrder(object, res){
    var x = orders.orders.length;
    orders.orders.push({number:orders.orders.length, name:object.name, amount:object.amount});
    console.log(orders);
    console.log("app.js, addToOrder, the object passed trough as a parameter:\n"+orders);
    res.render('cashier', {cashier: orders.cashier, orders: getOrders()});
}
//function to return the orders object.
function getOrders(){
    return orders;
}
//this will be used to clear the orders, might look slightly different later on.
function clearOrder(){
    orders = {cashier:"",branch:"", orders:[]};;
}

//helps us get the pictures and css from the folders /styles and /images so the
//.ejs files may be renderd properly.
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

//POST function used by the form in locationmanager.ejs,
//the choises in the form are extracted trough req (request)
app.post('/branchNames',urlencodedParser, function(req, res) {
    var selectedName = req.body.branchName;
    var selectedReport = req.body.reportSelect;
    console.log(selectedName);
    console.log(selectedReport);
    console.log("app.js, post, branchNames");
});
//POST function used by form in sales_report.ejs
// is not yet done as it still is a copy of another POST function.
app.post('/location_report',urlencodedParser, function(req, res) {
    console.log("app.js, post, employee");
    addToOrder(req.body);
    res.render('employee', {orders: getOrders(), branches:branches});
});
//POST function used by form in cashier.ejs,
//this function is used to remove an item from orders and
//rerender the page with the new order item list.
app.post('/removeMe',urlencodedParser, function(req, res) {
    delete orders.orders[req.body.itemNr];
    res.render('cashier', {cashier: orders.cashier, orders: getOrders()});
});
//POST function, not in use anymore?
app.post('/employee',urlencodedParser, function(req, res) {
    console.log("app.js, post, employee");
    addToOrder(req.body);
    res.render('employee', {orders: getOrders(), branches:branches});
});
//POST function to clear orders, is not yet complete as it need some tweeks
//in the content it renders.
app.post('/clear',urlencodedParser, function(req, res) {
    console.log("app.js, post, clear");
    clearOrder();
    res.render('cashier', getOrders());
});
//POST function to send the complete order to DB,
//needs to be constructed.
app.post('/send',urlencodedParser, function(req, res) {
    console.log("app.js, post, send");
});
//POST function used
app.post('/branch',urlencodedParser, function(req, res) {
    console.log("app.js, post, branch");
    branch = req.body.branch;
    fetch.getBranchID(branch, res, getEmployees);
});

app.post('/cashier',urlencodedParser, function(req, res) {
    console.log("app.js, post, cashier, chosen cashier:\n"+req.body.cashier);
    orders.cashier = req.body.cashier;
    res.render('cashier', {cashier: orders.cashier, orders: getOrders()});
});
app.get('/profile/:name', function(req, res) {
    var data = {hobbies: ['eating','fighting','and so on']}
    res.render('profile',{person:req.params.name, data: data});
});
app.get('/employee', function(req, res) {
    console.log("app.js, get, employee");
    branches = {branches:[], choise:[]};
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
    fetch.getBranchName(res);
});
app.get('/memberclub', function(req, res) {
    console.log("app.js, get, memberclub");
    res.render('memberclub');
});
app.get('/test', function(req, res) {
    console.log("app.js, get, test");
    insertDB.test(res);
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

function setBranchID(ob){
    orders.branchID = ob;
}

function getBranches(ob, res){
    branches = {branches:[], choise:[]};
    for (var i = 0; i < ob.length; i++) {
        branches.branches.push(ob[i].Address.Street);
    }
    res.render('employee', {orders: getOrders(), branches:branches});
}
function getEmployees(ob, res) {
    //create function that fetches all the names of employes, or ssn depending on branch.
    for (var i = 0; i < ob.length; i++) {
        console.log("app.js, loop in getEmployees, ID of the object being loopt trough:\n"+ ob[i].ID);
        orders.branch = ob[i].ID;
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
