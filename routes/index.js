var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.twig');
});


router.get('/chart', function(req, res, next) {
  res.render('charts.twig');
});



router.get('/After', function(req, res, next) {
   var db =req.db;
   var c=db.get('entrance');
    c.find({},{},function(e,docs){
    res.render('display.twig',{docs});
   });
});



router.get('/simpleform', function(req, res, next) {
  res.render('reaserch.twig');
});



router.post('/verif', function(req, res, next) {
           
           var db =req.db;
           var c= db.get('entrance');
           c.find({"ref":(req.body.search)},{},function(e,docs){
           if(docs =='')
           res.redirect('/After');
           else
           {res.render('reaserch.twig',{docs});
            
           }
           });
           
});




router.post('/mailing', function(req, res, next) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'service.securite005@gmail.com',
      pass: 'service123456789'
    }
  });

  

  var mailOptions = {
    from: 'service.securite005@gmail.com',
    to: String(req.body.emai),
    subject: 'Protocole Sanitaire',
    text: "M./Mme "+String(req.body.nom)+" vous n'avez pas respecté le protocole sanitaire le "+String(req.body.dat)+" ."+"En effet "+
    String(req.body.textarea)
  };
  

  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/After');
    }
  });




});

module.exports = router;
