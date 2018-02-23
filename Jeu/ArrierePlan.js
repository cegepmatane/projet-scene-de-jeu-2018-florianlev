var ArrierePlan = function(scene)
{
    var arrierePlan = this;

    var matriceHerbe = new createjs.Matrix2D();
    var paysageHerbe = new createjs.Shape();
    var imageHerbe = new Image();

    var matriceNuage = new createjs.Matrix2D();
    var paysageNuage = new createjs.Shape();
    var imageNuage = new Image();



    var initialiser = function ()
    {

    }
}

ArrierePlan.Configuration = 
{
  images : {
    imageBuisson : "ressource/paysage-cylindrique-avant.png",
    imageNuage : "ressource/paysage-nuage.png"
  },
  vitesseNuage : 3,
  vitesseMontagne : 1,
  vitesseBuisson : 9
}