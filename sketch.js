let bg;

let skiX
let skiY
let skier;
let trails = []
let snowflakes = []
let bgY = 0
let startOfSnow = true
let snowI
let speed = 0
let w
let obstacles = []
let oCoolDown = 0
let alive = true
let paused = false
let score = 0
let myFont;
let safety = 10
let dif = 1
let d = 0
let dAlready = false

function preload() {
  myFont = loadFont('assets/Pixel Coleco.otf');
}

function setup() {
  
  bigRock = loadImage('assets/bRock.png')
  tree = loadImage('assets/tree.png')
  rockPatch = loadImage('assets/rockPatch.png')
  bigRock.resize(189, 111)
  tree.resize(141, 177)
  rockPatch.resize(159, 87)
  ski1 = loadImage('assets/skee.png')
  bg = loadImage('assets/Background.png');
  // ski2 = loadImage('assets/ski2.png')
  skiR = loadImage('assets/rightSki.png')
  skiL = loadImage('assets/leftSki.png')
  createCanvas(windowWidth, windowHeight);
  w = 42
  skiX = (windowWidth/2)-w/2
  skiY = (windowHeight/2)-63
  //requestPointerLock()
  snowInt()


}

function draw() {
  isAlive()
  isPaused()
  resizeCanvas(windowWidth, windowHeight)
  if(alive == true && paused == false){
    IncSnowDensity()
    getDif()
    image(bg, 0, getBgY(), windowWidth, windowWidth*4)
    image(bg, 0, getBgY()+4*windowWidth, windowWidth, windowWidth*4)
    noCursor()
    intTrails()
    trailer()
    if(dAlready == false){
      skimanDir()
    }
    skiPos()
    snowflakey()
    obstacleAdd()
    getScore()
    displayScore()
  }
  else{
    cursor()
    if(paused && alive){
      textSize(100)
      text('Game Paused', windowWidth/2-200, windowHeight/2-50)
      textSize(50)
      text('Press Return to Unpause', windowWidth/2-100, windowHeight/2+50)
      textSize(40)
      text(score, windowWidth-150, 50)
    }
    else if(alive == false){
      textSize(150)
      fill('red')
      text('RIP', windowWidth/2-150, windowHeight/2-50)
      fill('black')
      textSize(40)
      text(score, windowWidth-150, 50)
    }
  }
}

function isAlive(){
  for (obstacle of obstacles){
    rCorn = obstacle.x + obstacle.wid
    lCorn = obstacle.x
    if(d == 'l'){
      if(lCorn+obstacle.wid/2-20 < skiX+w-10 && lCorn+obstacle.wid/2+20 > skiX && round(skiY+126, -2) == round(obstacle.y+obstacle.h, -2) && obstacle.pic == tree){
        alive = false
      }
      else if(lCorn < skiX+w-10 && rCorn > skiX && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y+20 && obstacle.pic == bigRock){
        alive = false
      }
      else if(lCorn-10 < skiX+w-10 && rCorn+10 > skiX && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y && obstacle.pic == rockPatch){
        alive = false
      }
    }
    else if(d == 'r'){
      if(lCorn+obstacle.wid/2-20 < skiX+w && lCorn+obstacle.wid/2+20 > skiX+10 && round(skiY+126, -2) == round(obstacle.y+obstacle.h, -2) && obstacle.pic == tree){
        alive = false
      }
      else if(lCorn < skiX+w && rCorn > skiX+10 && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y+20 && obstacle.pic == bigRock){
        alive = false
      }
      else if(lCorn-10 < skiX+w && rCorn+10 > skiX+10 && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y && obstacle.pic == rockPatch){
        alive = false
      }
    }
    else if(d == 0){
      if(lCorn+obstacle.wid/2-20 < skiX+w && lCorn+obstacle.wid/2+20 > skiX && round(skiY+152, -2) == round(obstacle.y+obstacle.h, -2) && obstacle.pic == tree){
        alive = false
      }
      else if(lCorn < skiX+w && rCorn > skiX && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y+20 && obstacle.pic == bigRock){
        alive = false
      }
      else if(lCorn-10 < skiX+w && rCorn-10 > skiX && skiY+126 < obstacle.y+obstacle.h && skiY+126 > obstacle.y && obstacle.pic == rockPatch){
        alive = false
      }
    }
  }
}

function getDif(){
  dif+=.0005
}

function isPaused(){
  if(keyPressed('Escape')){
    paused = true
  }
  else if(keyPressed('Enter')){
    paused = false
  }
}

function getScore(){

    score++
    if(safety>.5){
      safety-= .005
    }
}

function displayScore(){
  fill('black')
  textFont(myFont)
  textSize(40)
  text(score, windowWidth-150, 50)
}

function obstacleAdd(){
  if(oCoolDown>0){
    oCoolDown -- 
  }
  if(doesOccur(.1) && oCoolDown <= 0){
    obstacles.push(new Obstacle(random(0, windowWidth-189), windowHeight+111, 189, 111, bigRock, dif))
    if(dif <4.5){
      oCoolDown += 200 - 40*dif
    }
    else{
      oCoolDown += 10
    }
  } 
  else if(doesOccur(.5) && oCoolDown <= 0){
    obstacles.push(new Obstacle(random(0, windowWidth-141), windowHeight+177, 141, 177, tree, dif))
    if(dif <4.5){
      oCoolDown += 200 - 40*dif
    }
    else{
      oCoolDown += 10
    }
  }
  else if(doesOccur(.15) && oCoolDown <= 0){
    obstacles.push(new Obstacle(random(0, windowWidth-159), windowHeight+87, 159, 87, rockPatch, dif))
    if(dif <4.5){
      oCoolDown += 200 - 40*dif
    }
    else{
      oCoolDown += 10
    }
  }
  for (obstacle of obstacles){
    obstacle.display()
    obstacle.move()
    if(obstacle.y+obstacle.h<0){
      obstacles.shift()
    }
    if(obstacle.y+obstacle.h < skiY+126 && dAlready == false && skiY < obstacle.y+obstacle.h){
      dAlready = true
      skimanDir()
    }
    else{
      dAlready = false
    }
  }
}

function doesOccur(freq){
  if(round(random(0, 100*safety/freq), 4) <= 100){
      return true
  }
  else{
      return false
  }
}

function skiPos(){
  skiX += speed
  if(skiX<-w){
    skiX = windowWidth
  }
  if(skiX>windowWidth){
    skiX = -w
  }
}

function skimanDir(){

  if(keyPressed('a')){
    w = 35
    d = 'l'
    
    if(speed > -3-dif){
      speed -= .04*dif
    }
    image(skiL, skiX-19, skiY, w*2, 126)
  }
  else if(keyPressed('d')){
    w = 35
    d = 'r'
    if(speed < 3+dif){
      speed += .04*dif
    }
    image(skiR, skiX-19, skiY, w*2, 126)
  }
  else {
    d = 0
    w=42
    image(ski1, skiX, skiY-5, w, 152)
    if(speed>0){
      speed-=.04*dif
    }
    else if(speed<0){
      speed+=.04*dif
    }
    else{
      speed = 0
    }
  }
}

function keyPressed(k) {
  if (key == k) {
    return true
  } 
  else {
    return false;
  }
}

function IncSnowDensity(){
  if(round(random(0,1000/dif)== 1)){
  snowflakes.push(new Snow(random(0, windowHeight)))
  }
}

function snowInt(){
  for (snowI = 0; snowI< 500; snowI++){
    snowflakes.push(new Snow(random(0, windowHeight), dif))
  }
}

function snowflakey(){
  for (let snowflake of snowflakes){
    snowflake.display()
    snowflake.move()
    let chanceOfFall = random(0,10) 
    if((snowflake.getY() >= windowHeight) || chanceOfFall < .035){
      snowflake.y = 0
    }
  }
}

  function getBgY(){
    bgY -=dif
    if(bgY<-windowWidth*7){
      bgY = -3*windowWidth
    }
    return bgY
  }

  function intTrails(){
    trails.push(new Trails(skiX, skiY, dif))
  }

  function trailer(){
    for (trail of trails){
      if (trail.y > 0){
        trail.display()
        trail.move()
      }
      else{
        trails.shift()
      }
    }
  }
