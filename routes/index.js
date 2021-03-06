var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  var dataBike = [
    {name: "Model BIKO45", url:"/images/bike-1.jpg", price: 679},
    {name: "Model ZOOK7", url:"/images/bike-2.jpg", price: 799},
    {name: "Model LIKO89", url:"/images/bike-3.jpg", price: 839},
    {name: "Model GEWO", url:"/images/bike-4.jpg", price: 1206},
    {name: "Model TITAN5", url:"/images/bike-5.jpg", price: 989},
    {name: "Model AMIG39", url:"/images/bike-6.jpg", price: 599}
  ]
// création de la variable de session et iaffectation à videreq

// if (!req.session.dataCardBike) {
// // si session n'existe pas
// req.session.dataCardBike = [];
// }

//affectation de la varable de session panier
if (typeof req.session.dataCardBike == "undefined")
{
  req.session.dataCardBike = [];

}
// tester si la variable de session existe
// si elle existe on fait rien
//si elle n'existe pas on la créé
// if (typeof myVar != "undefined") {
// // ta variable existe
// } else {
// // elle n'existe pas
// }

  // envoyer le catalogue et le panier initialisé à vide lors de la première connexion à la boutique
  res.render('index', { dataBike:dataBike , dataCardBike:req.session.dataCardBike });
  //initialisation de la variable de session dataBikeCard en variable de sessions



});

//route du panier
router.get('/shop', function(req, res, next) {
  res.render('shop', {dataBikeCard : req.session.dataCardBike});
});



//ajout dans le panier
router.post('/add-shop', function(req, res, next) {

  req.session.dataCardBike.push(req.body);
  res.render('shop', {dataCardBike : req.session.dataCardBike});
});

//suppr d'un element du panier
router.get('/delete-shop', function(req, res, next) {
  req.session.dataCardBike.splice(req.query.position, 1)
  res.render('shop', {dataCardBike : req.session.dataCardBike});
});

//modification d'un element du panier
router.post('/update-shop', function(req, res, next) {

  req.session.dataCardBike[req.body.position].quantity = req.body.quantity;
  res.render('shop', {dataCardBike : req.session.dataCardBike});
});

module.exports = router;
