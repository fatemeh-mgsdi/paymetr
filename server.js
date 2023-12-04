var express =require('express');
var server = express();
var mongoose =require('mongoose');
var nJwt = require('njwt');
var jalaali = require('jalaali-js');
var jdate =  require('jdate').JDate();
var bodyParser=require('body-parser');
var assert = require('assert');
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
var mongodb= require('mongodb');
var port = 3735;
var url ='mongodb://localhost:27017/Paymetr';
var userModels = require('./models/user.js');
var daysModels = require('./models/days.js');
var goingHomeModels = require('./models/goingHome.js');
var goingUniModels = require('./models/goingUni.js');
server.use(function(req,res,next){
console.log('..There is some process..');
  next();
});
mongoose.connect(url);
var db = mongoose.connection;

//register
server.post('/register', function (req, res) {
  var register = require('./APIs/register');
  register(req, res, db,userModels);
});

//log in
server.post('/login', function (req, res) {
  var userLogin = require('./APIs/login.js');
  userLogin(req, res,db, nJwt);
});


//going to university
server.post('/goUni',function(req,res){
  var goUni = require('./APIs/goUni.js');
  goUni(req,res, db, goingHomeModels,goingUniModels,daysModels,nJwt,jalaali);
});

//going home
server.post('/goHome',function(req,res){
  var goHome = require('./APIs/goHome.js');
  goHome(req,res, db, goingHomeModels,goingUniModels,daysModels,nJwt,jdate);
});

//your db
server.get('/paymetrDb',function(req,res){
  var paymetrdb = require('./APIs/dateBase.js');
  paymetrdb(req,res,db,nJwt);
});
server.get('/test',function(req,res){
  res.json({success : true});
});

//delete Users
server.post('/deleteDB',function(req,res){
  var deletdb = require('./APIs/deleteDB.js');
  deletdb(req,res,db);
});

//delete one user
server.post('/deleteUser',function(req,res){
  var deleteUsers = require('./APIs/deleteUser.js');
  deleteUsers(req,res,db);
});

  server.listen(port,function(){
    console.log('Paymetr is working on port ' + port);
});
