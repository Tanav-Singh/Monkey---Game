
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score;
var ground;
var PLAY = 1;
var END = 0;
var gamestate = PLAY; 
var bananaGroup,obstacleGroup;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
  bananaGroup = new Group();
  obstacleGroup = new Group();
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  
  var survivalTime = 0
  
  score = 0;
} 

function draw() {
  background("lightblue")
  
   text("Score: "+ score, 500,50);

  
  if(gamestate === PLAY){
    //score
    stroke("black")
    textSize(20);
    fill("black")
    survivaltime = Math.round(frameCount/20)
    
    //jumping
    if(keyDown("space")&& monkey.y >= 300) {
      monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.80;
    
    //banana and obstacles
    banana();
    obstacles();
    
    //touching banana
    if(monkey.isTouching(bananaGroup)){
      score = score+1
      bananaGroup.destroyEach();
    }
    if(monkey.isTouching(obstacleGroup)){
      gamestate = END
    }
  }
  
  if(gamestate === END){
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    monkey.velocityY = 0
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  
  stroke("black")
  textSize(20);
  fill("black")
  text("Survival Time = " + survivaltime, 240,50)
  drawSprites();
  
  
}

function banana(){
  if(frameCount % 145 === 0){
    var banana = createSprite(600,400,20,20)
    banana.y = Math.round(random(220,250))
    banana.velocityX = -4
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.lifetime = 155
    bananaGroup.add(banana)
  }
}

function obstacles(){
 if (frameCount % 230 === 0){
   var obstacle = createSprite(600,320,10,40);
   obstacle.setCollider("circle",10,250,240)
   obstacle.velocityX = -4;  
   obstacle.addImage(obstaceImage)
   obstacle.scale = 0.14;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
 }
}




