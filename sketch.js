
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState
var PLAY=1
var END=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300)
  gameState=PLAY
//creating monkey
  monkey=createSprite(80,210,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  
//creating the ground
  ground=createSprite(400,250,900,10)
  ground.velocityX=-4
  ground.x=width/2
//creating groups
  foodGroup=createGroup()
  obstacleGroup=createGroup()
}


function draw() {
  
  background(255)

//repeating ground
  if(ground.x<145&&gameState===PLAY){
     ground.x=width/2
     }
//adding jump function
  if(keyDown('space')&&monkey.y>150&gameState===PLAY){
     monkey.velocityY=-13
     }
//adding gravity
   monkey.velocityY=monkey.velocityY+0.8
//making the monkey collide
   monkey.collide(ground)  
//spawning bananas
  randA=Math.round(random(11,12))
//spawning sprites
  if(frameCount%(randA*10)===0&&gameState===PLAY){
    food()
   } 
  if(frameCount%120===0&&gameState===PLAY){
    spawnObstacles()
  }
//detecting collisions
 if(obstacleGroup.isTouching(monkey)){
     gameState=END  
     obstacleGroup.destroyEach()
     foodGroup.destroyEach()
     ground.velocityX=0
     }
//drawingSprites
  drawSprites()  
//score value
  if(gameState===PLAY){
    score=Math.round(frameCount/frameRate())
  }
//displaying survival time
  textSize(20)
  fill("black")
  text("survival time:"+score,100,50)
}

function food(){
  randY=Math.ceil(random(30,150))
  banana=createSprite(580,randY,20,20)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5
  banana.lifetime=120
  foodGroup.add(banana)
}
function spawnObstacles(){
  obstacle=createSprite(580,220,20,20)
  obstacle.velocityX=-5
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.15
  obstacle.lifetime=120
  obstacleGroup.add(obstacle)
    
}



