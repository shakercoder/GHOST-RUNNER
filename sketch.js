var ghost,ghostImage;
var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisibleblock,invisibleGroup;
var gamestate="play";
var bbsound;






function preload(){
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  bbsound=loadSound("spooky.wav");
  
  
  
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleGroup=new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;
  
  bbsound.loop();
  
  
  
  
  
  
  
  
}

function draw(){
  background("black");
  if(gamestate==="play"){
     
    if(invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gamestate="end";
      
      
       } 
    
    
    
  
  if(tower.y>500){
     tower.y=300;
     }
  
  if(keyDown("space")){
    ghost.velocityY=-6;
     }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-4
     }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+4
     }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
     
     }
  
  
  //giving gravity
  ghost.velocityY=ghost.velocityY+0.5;
  
  
  spawndoors();
  
  drawSprites();
  }
  if(gamestate==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAMEOVER",230,250);
    
    
     }
  
}
function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImage);
    door.velocityY=tower.velocityY;
    door.x=Math.round(random(100,400));
    door.lifetime=600;
    doorGroup.add(door);
    
    door.depth=ghost.depth;
    ghost.depth+=1;
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImage);
    climber.velocityY=tower.velocityY;
    climber.x=door.x;
    climber.lifetime=600;
    climberGroup.add(climber);
    
    invisibleblock=createSprite(200,25,climber.width,2);
    invisibleblock.velocityY=tower.velocityY;
    invisibleblock.x=door.x;
    invisibleblock.lifetime=600;
    invisibleGroup.add(invisibleblock);
    invisibleblock.debug=true;
    
    
     }
  
  
}



