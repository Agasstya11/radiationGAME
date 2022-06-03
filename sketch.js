  var underwaterImg,underWater
 var spaceShip, spaceShipImg
 var fuel1, fuelImg, fuel2, fuel3
 var hero,heroImg
 var net, netImg
 var gameState="start"
 var fuelScore=-0;
 var timer=10;
 var blastImg

function preload() {
   spaceShipImg=loadImage("spaceShip.png")
   underwaterImg=loadImage("underwater.png")
   heroImg=loadImage("hero.png")
   fuelImg=loadImage("fuel.png")
   netImg=loadImage("net.png")
   blastImg=loadImage("blast.png")
}

function setup(){
    var canvas = createCanvas(2400,1200);
    spaceShip=createSprite(1200,450,2,2);
    spaceShip.addImage("spaceShipImg",spaceShipImg);
    hero=createSprite(1200,450,2,2);
    hero.addImage("heroImg",heroImg);
    hero.addImage("heroImg",heroImg);
    fuel1=createSprite(1350,900,1,1)
    fuel1.addImage("fuelImg",fuelImg);
    fuel1.scale=0.5
    fuel2=createSprite(2100,1000,1,1)
    fuel2.addImage("fuelImg",fuelImg);
    fuel2.scale=0.5
    fuel3=createSprite(500,1050,1,1)
    fuel3.addImage("fuelImg",fuelImg);
    fuel3.scale=0.5
    net=createSprite(1200,150,2,2);
    net.addImage("netImg",netImg);
    net.scale=0.5
   

}

function draw(){
        background(underwaterImg);
    if(gameState=="start"){
        net.x=net.x-15
        console.log(3);
        if(net.x<=0){
            gameState="moveRight"
        }
        if(keyDown(DOWN_ARROW)){
            gameState="moveDown"
        }
    }

   
    if(gameState=="moveRight"){
        net.x=net.x+15
        if(net.x>=width){
            gameState="moveLeft"
        }
        if(keyDown(DOWN_ARROW)){
            gameState="moveDown"
        }
    }
    if(gameState=="moveLeft"){
        net.x=net.x-15
        if(net.x<=0){
            gameState="moveRight"
        }
        if(keyDown(DOWN_ARROW)){
            gameState="moveDown"
        }
    }

    if(gameState=="moveDown"){
        net.y=net.y+15
        if(net.y>=height){
            net.y=150
            net.x=1200
            gameState="start"
        }
        
      if(net.isTouching(fuel3)){
          fuel3.x=-50
          fuel3.y=-50
          fuelScore+=30
            }
      if(net.isTouching(fuel2)){
         fuel2.x=-50
         fuel2.y=-50
         fuelScore+=30
                }
     if(net.isTouching(fuel1)){
           fuel1.x=-50
           fuel1.y=-50
           fuelScore+=30
                    }
    }
    showFuelBar();
    if(fuelScore==90){
        spaceShip.velocityY=-2;
        hero.velocityY=-2;
        net.y=-150;
         stroke("black");
         fill("red");
         textSize(70);
         text("YOU SURVIVED",width/2-180,height/2-50);
         gameState="end"
    }
    
    if(gameState!="end"){
        if(frameCount%60==0 && timer>0){
            timer--
        }
    }

    stroke("black");
    fill("red");
    textSize(20);
    text("TIME LEFT = "+timer,width-250,100);
    if(timer==0){
        spaceShip.addImage("spaceShipImg",blastImg);
        stroke("black");
        fill("red");
        textSize(70);
        text("YOU DIED",width/2-180,100);
        net.y=-150;
        gameState="end"
        hero.y=-150;
        fuel1.y=-150;
        fuel2.y=-150;
        fuel3.y=-150;
        
    }

    drawSprites();
}

 function showFuelBar() {
    push();
    image(fuelImg, width - 250, 0, 50, 50);
    fill("white");
    rect(width  - 200,20, 90, 20);
    fill("#ffc400");
    rect(width  - 200, 20, fuelScore, 20);
    noStroke();
    pop();
  }