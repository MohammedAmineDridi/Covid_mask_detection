var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var db =req.db;
  var c=db.get('admin');
  c.find({'name':req.body.email,'pwd':req.body.password},{},function(e,docs){
    if(docs =='')
    res.redirect('/');
    else
    { 
      res.redirect('/After');
    }
   });
});

module.exports = router;
