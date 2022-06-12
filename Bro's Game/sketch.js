var INICIO = 1;
var JOGAR = 0;
var JOGAR2 = 4;
var JOGAR3 = 5
var FIM = 2;
var FIM2 = 6;
var fimExit = 3;
var estadoJogo = INICIO;
var p1, ground, annie, sylas, boca, sapo, album;
var p1Parado1, p1Correndo1, p1Correndo2;
var mrkImg1, mrkImg2, mrkParado
var Cimg1, Cimg2, Cparado;
var monoImg, ruimImg, boquinhaImg, albumImg,
sapinhoImg;
var perdeuSound, pontoSound, boomSound, uhhSound;
var ponto = 0;


function preload(){
    p1Parado1 = loadAnimation("stop1.png");
    p1Correndo1 = loadAnimation("stop1.png", "run1.png");
    p1Correndo2 = loadAnimation("stop2.png", "run2.png");
    mrkParado = loadAnimation("mrk1.png");
    mrkImg1 = loadAnimation("mrk1.png","mrk(run1).png");
    mrkImg2 = loadAnimation("mrk2.png", "mrk(run2).png");
    Cimg1 = loadAnimation("c1.png", "Crun1.png");
    Cimg2 = loadAnimation("c2.png", "Crun2.png");

    monoImg = loadImage("coin.png");
    ruimImg = loadImage("bomb.png");
    boquinhaImg = loadImage("coin.png");
    sapinhoImg = loadImage("bomb.png")
    albumImg = loadImage("coin.png");

    perdeuSound = loadSound("perca.mp3");
    pontoSound = loadSound("point.mp3");
    boomSound = loadSound("boom.mp3")
    uhhSound = loadSound("Uhh.mp3")
    

}

function setup(){
    createCanvas(windowWidth, windowHeight)

    ground = createSprite(width/2, height,width, 60);
    ground.shapeColor = 'green';

    p1 = createSprite(width/2, height-40, 15,15);
    p1.addAnimation("parado", p1Parado1);
    p1.addAnimation("marquitoParado", mrkParado);
    p1.setCollider("circle", 0, 0, 30)

    //p1.debug = true;

    GSylas = new Group();
    GAnnie = new Group();
    GBoca = new Group();
    Gsapo = new Group();
    Galbum = new Group();
}

function draw(){
    background('lightblue');

    fill(0);
    textFont("impact")
    textSize(20)
    text("Pontos: "+ ponto, width/2,height/20);

    if(estadoJogo === INICIO){
        if(keyDown("h")){
            estadoJogo = JOGAR;
        }

        if(keyDown("m")){
            estadoJogo = JOGAR2;
        }

        if(keyDown("c")){
            estadoJogo = JOGAR3;
            
        }
    }

  if(estadoJogo === JOGAR){
    controls1();

    gerarAnnie();

    if(p1.isTouching(GAnnie)){
        ponto = ponto+1;
        GAnnie.destroyEach();
        pontoSound.play();
    }

    gerarSylas();

    if(p1.isTouching(GSylas)){
        p1.velocityX = 0;
        boomSound.play();
        GSylas.setVelocityYEach(0);
        GAnnie.setVelocityYEach(0);
        GSylas.setLifetimeEach(-1);
        GAnnie.setLifetimeEach(-1);
        estadoJogo = FIM;
    }

    exit();
}


    if(estadoJogo === JOGAR2){

        controls2();

        gerarBoca();
        if(p1.isTouching(GBoca)){
            ponto = ponto+1;
            GBoca.destroyEach();
            pontoSound.play();
        }

        gerarSapo();
        if(p1.isTouching(Gsapo)){
            p1.velocityX = 0;
            boomSound.play();
            Gsapo.setVelocityYEach(0);
            GBoca.setVelocityYEach(0);
            Gsapo.setLifetimeEach(-1);
            GBoca.setLifetimeEach(-1);
            estadoJogo = FIM2;
        }


        exit();
    }

    if(estadoJogo === JOGAR3){
        controls3();

        gerarAlbum();
        if(p1.isTouching(Galbum)){
            ponto = ponto+1;
            Galbum.destroyEach();
            pontoSound.play();
        }

        gerarSapo();
        if(p1.isTouching(Gsapo)){
            p1.velocityX = 0;
            boomSound.play();
            Gsapo.setVelocityYEach(0);
            Galbum.setVelocityYEach(0);
            Gsapo.setLifetimeEach(-1);
            Galbum.setLifetimeEach(-1);
            estadoJogo = FIM2;
        }

        exit();
    }

    if(estadoJogo === FIM){
        fill('red');
        textFont('Arial')
        text("TENHA CUIDADO COM  AS BOMBAS!!!!\nAperta R pra reinciar aí"
                , width/3, height/2);
        
        reset();
        GBoca.destroyEach();
        Gsapo.destroyEach();

    }

    if(estadoJogo === FIM2){
        fill('red');
        textFont('Arial')
        text("TENHA CUIDADO COM  AS BOMBAS!!!!\nAperta R pra reinciar aí"
                , width/3, height/2);
        
        reset();
    }

    if(estadoJogo === fimExit){
        fill('black');
        textFont('Arial')
        text("Ta indo pra onde amigão? o jogo ta aqui\nAperta R pra reinciar aí"
                , width/3, height/2);

        reset();
    }

    drawSprites();

    if(estadoJogo === INICIO){
        fill(0)
        textFont('Arial')
        text("SELECIONE UM PERSONAGEM:\nH - Igor, M - Marcus, C - Carlos", 
                    width/3, height/2);
    }

}

function gerarAnnie(){
    if(frameCount % 150 === 0){
        annie = createSprite(Math.round(random(width/4, width-10), -10, 15, 15));
        annie.addImage(monoImg);
        annie.scale = 0.03
        annie.lifetime = height/2;
        annie.velocityY = (5+ ponto);
        GAnnie.add(annie);
    }
}

function gerarSylas(){  
    if(frameCount % 250 === 0){
        sylas = createSprite(Math.round(random(width/4, width-10), -10, 15, 15))
        sylas.addImage(ruimImg);
        sylas.scale = 0.1
        sylas.velocityY = (6+ponto);
        sylas.lifetime = height/2;
        GSylas.add(sylas);

    }
}

function gerarBoca(){
    if(frameCount % 150 === 0){
        boca = createSprite(Math.round(random(width/4, width-10), -10, 15, 15));
        boca.addImage(boquinhaImg);
        boca.scale = 0.02
        boca.lifetime = height/2;
        boca.velocityY = (5+ ponto);
        GBoca.add(boca);
    }
}

function gerarSapo(){
    if(frameCount % 250 === 0){
        sapo = createSprite(Math.round(random(width/4, width-10), -10, 15, 15))
        sapo.addImage(sapinhoImg);
        sapo.scale = 0.1
        sapo.velocityY = (6+ponto);
        sapo.lifetime = height/2;
        Gsapo.add(sapo);

    }
}

function gerarAlbum(){
    if(frameCount % 150 === 0){
        album = createSprite(Math.round(random(width/4, width-10), -10, 15, 15));
        album.addImage(albumImg);
        album.scale = 0.02
        album.lifetime = height/2;
        album.velocityY = (5+ ponto);
        Galbum.add(album);
    }
}

function reset(){
   if(keyDown('r')){ 
    estadoJogo = INICIO;
    GSylas.destroyEach();
    GAnnie.destroyEach();
    Galbum.destroyEach();
    Gsapo.destroyEach();
    GBoca.destroyEach();
    p1.x = width/2;
    ponto = 0;
   }
}

function controls1(){
    if(keyDown("d")){
        p1.addAnimation("correndo1", p1Correndo1);
        p1.changeAnimation("correndo1");
        p1.velocityX = (8+ponto*0.5)
    }

    if(keyDown("a")){
        p1.addAnimation("correndo2", p1Correndo2);
        p1.changeAnimation("correndo2");
        p1.velocityX = -(8+ ponto*0.5)
    }
}

function controls2(){
    if(keyDown("d")){
        p1.addAnimation("marquito1", mrkImg1);
        p1.changeAnimation("marquito1");
        p1.velocityX = (8+ponto*0.5)
    }

    if(keyDown("a")){
        p1.addAnimation("marquito2", mrkImg2);
        p1.changeAnimation("marquito2");
        p1.velocityX = -(8+ ponto*0.5)
    }
}

function controls3(){
    if(keyDown("d")){
        p1.addAnimation("carlos1", Cimg1);
        p1.changeAnimation("carlos1");
        p1.velocityX = (8+ponto*0.5)
    }

    if(keyDown("a")){
        p1.addAnimation("carlos2", Cimg2);
        p1.changeAnimation("carlos2");
        p1.velocityX = -(8+ ponto*0.5)
    }
}



function exit(){
    if((p1.x < 0) || p1.x > width){
        p1.velocityX = 0;
        GSylas.setVelocityYEach(0);
        GAnnie.setVelocityYEach(0);
        GSylas.setLifetimeEach(-1);
        GAnnie.setLifetimeEach(-1);
        estadoJogo = fimExit
        boomSound.play();
    }
}
    