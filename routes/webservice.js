// atelier : les webservices


var express = require('express');

var router = express.Router() ;

var url = require('url') ;

var querystring = require('querystring') ;  // sub string

//const { param } = require('./employees');



// route d'affcihae la liste des employees   :  /webservice/list_entrance


router.get('/list_entrance', function(req,res){


   var db = req.db ; // localhost:27017/employee
 
   var c = db.get('entrance') ;   // selectionner la collection entrance .


    c.find({},{},function(err,docs){

            // afficher la iste des employee en json .

            res.json(docs);

    });


});



 // route   : /webservice/ajouter_entrance?ref=...

 router.get('/ajouter_entrance', function(req, res, next) {
 
   // ajouté un pc depuis l'url

   var page = url.parse(req.url).pathname ;  // recuperer les paramétres envoyée dans l'url

   var params = querystring.parse(url.parse(req.url).query) ; // params est un tableau



    
      var db = req.db ; // localhost:27017/employee
 
      var c = db.get('entrance') ;   // selectionner la collection entrance .
 
    //console.log(req.body); // les infos dans les champs input .

   

    if ( 'ref' in params && 'first_name' in params  && 'last_name' in params  && 'etat' in params && 'email' in params && 'coef' in params ) {

 

        var my_emp = { ref: params['ref']  , first_name: params['first_name']  , last_name: params['last_name']  , etat: params['etat'] ,
    
        email: params['email'] , coef: params['coef']  };

        c.insert(my_emp,function(err,result){

            // req.body : contient les données a ajouté .

          console.log(my_emp);
      
          if (err) throw err ;
       
           res.send(" employee 'entrance' de ref " + params['ref'] +"// et de first name  = " + params['first_name'] +" // et de last name = "+  
           
           params['last_name'] + "  // et de email = " + params['email'] + " // et de coef = " + params['coef'] ) ;
       
          });



    

}

     
  
  });


  


  // chercher une entrance (employee) avec la reference.



   // route = /webservice/chercher/ref_val



 router.get('/chercher/:ref', function(req, res, next) {
 
  
  var db = req.db ; // localhost:27017/employee

  var c = db.get('entrance') ;   // selectionner la collection entrance .
   
  c.find({"ref":req.params.ref},{},function(err,docs){


      if (err) {
        res.send(" erreur : entrance nom trouvée ");
      }

      else{


        res.json(docs);

        }

      

  });
     
  
  });








  // route delete employe



router.delete('/:id', function(req, res, next) {
 
  
  var db = req.db ; // localhost:27017/employee

  var c = db.get('entrance') ;   // selectionner la collection entrance .
   
  c.remove({"_id":req.params.id},{},function(err,docs){


      if (err) {
        res.send(" erreur : entrance nom trouvée ");
      }

      else{

        res.send("entrance supprimé avec succés ");
      }

  });
     
  
  });





  // route de modifier un employee (entrance ) , selon la reference (ref) .



  // webservice/modifier/ref_val/coef_val



  router.get('/modifier/:ref/:etat/:coef/:date', function(req, res, next) {
 
  


    var db = req.db ; // localhost:27017/stock
  
    var c = db.get('entrance') ;   // selectionner la collection entrance .

    //var myquery = { ref: req.params.ref };

    //var new_coef = { $set: {coef: req.params.coef} };

     console.log(req.params.ref);
     console.log("-------");
     console.log(req.params.coef);


    //res.send(" ref = " + req.params.ref + " // coef = " + req.params.coef);


    var myref = { ref: req.params.ref };

    var new_entrance = { $set: {etat: req.params.etat , coef:req.params.coef , date: req.params.date } };

    c.findOneAndUpdate({"ref":req.params.ref},new_entrance,{new : true},function(err,docs){
  
  
        if (err) {
          res.send(" erreur : entrance nom trouvée ");
        }
  
        else{ 
         

          res.send("entrance modifier avec succés ");

          //res.send(" ref = " + req.params.ref + " // coef = " + req.params.coef);

        }
  
    });
       



    
    });




module.exports = router;