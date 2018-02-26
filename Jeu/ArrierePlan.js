var ArrierePlan = function (scene) {
    var arrierePlan = this;


    var nombreImagesChargees = 0;
    var arrierePlanConteneur = new createjs.Container();
    var matriceHerbe = new createjs.Matrix2D();
    var paysageHerbe = new createjs.Shape();
    var imageHerbe = new Image();

    var matriceNuage = new createjs.Matrix2D();
    var paysageNuage = new createjs.Shape();
    var imageNuage = new Image();

    var chargementCompletArrierePlan = document.createEvent('Event');
    chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

    var acceleration = 1;

    var initialiser = function () {
        imageHerbe.onload = function () {
            paysageHerbe.graphics.beginBitmapFill(imageHerbe, "repeat", matriceHerbe).drawRect(0, 0, 1200, 800).endStroke();
            nombreImagesChargees++;

        }
        imageHerbe.src = ArrierePlan.Configuration.images.imageHerbe;

        imageNuage.onload = function () {
            paysageNuage.graphics.beginBitmapFill(imageNuage, "repeat", matriceNuage).drawRect(0, 0, 1200, 3000).endStroke();
            nombreImagesChargees++;

        }
        imageNuage.src = ArrierePlan.Configuration.images.imageNuage;



        var demarrerAnimation = function (evenement) {
            arrierePlanConteneur.addChild(paysageHerbe)
            arrierePlanConteneur.addChild(paysageNuage)

        }

        var validerChargementImages = function (evenement) {
            if (nombreImagesChargees == Object.keys(ArrierePlan.Configuration.images).length) {
                window.dispatchEvent(chargementCompletArrierePlan);
                createjs.Ticker.removeEventListener("tick", validerChargementImages);
                //window.dispatchEvent(window.Evenement.arrierePlanFinChargement);
            }
        }

        window.addEventListener('chargementCompletArrierePlan', demarrerAnimation, false);
        createjs.Ticker.addEventListener("tick", validerChargementImages);
    }


    this.afficher = function()
    {
        scene.addChild(arrierePlanConteneur);

    }

    initialiser();

    this.rafraichirAnimation =  function(evenement)
    {
      

        matriceNuage.translate(-ArrierePlan.Configuration.vitesseNuage * acceleration,3 );
        matriceHerbe.translate(-ArrierePlan.Configuration.vietesseHerbe * acceleration,1);
        console.log("arrierePlan acceleration: "+acceleration);
	
    }


}

ArrierePlan.Configuration =
    {
        images: {
            imageHerbe: "herbe.png",
            imageNuage: "nuage.png"
        },
        vitesseNuage: 2,
        vietesseHerbe: 1
    }