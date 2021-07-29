var express = require('express');
var router = express.Router();




router.get('/verifd', function(req, res, next) {  
var db =req.db;
var c=db.get('entrance');
c.count({etat:1},function (error, count) {
    res.send(String(count));     
    }); 
  });




router.get('/verifg', function(req, res, next) {  
    var db =req.db;
    var c=db.get('entrance');
    c.count({etat:0},function (error, count) {
        res.send(String(count));     
        }); 
});



router.get('/verifc0', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:0},function (error, count) {
      
      res.send(String(count));     
      }); 
});
router.get('/verifc1', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:1},function (error, count) {
    
      res.send(String(count));     
      }); 
});




router.get('/verifc2', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:1,etat:0},function (error, count) {
    
      res.send(String(count));     
      }); 
});



router.get('/verifc3', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:{$lt:2}},function (error, count) {
    
      res.send(String(count));     
      }); 
});





router.get('/verifc4', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:3},function (error, count) {
    
      res.send(String(count));     
      }); 
});



router.get('/verifc5', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:{$gt:3}},function (error, count) {
    
      res.send(String(count));     
      }); 
});




router.get('/verifc6', function(req, res, next) {  
  var db =req.db;
  var c=db.get('entrance');
  c.count({coef:{$gt:5}},function (error, count) {
      
      res.send(String(count));     
      }); 
});
 


  module.exports = router;