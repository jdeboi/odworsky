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
let h
let obstacles = []
let totems = []
let objCoolDown = 0
let alive = true
let paused = false
let score = 0
let myFont;
let safety = 10
let dif = 1
let d = 0
let dAlready = false
let lastSki = []
let filterCoolDown = 0
let hS = localStorage
let playing = false



function preload() {
  myFont = loadFont('assets/Pixel Coleco.otf');
  skiR = loadImage('assets/riSki.png')
  skiL = loadImage('assets/leSki.png')
  ski1 = loadImage('assets/skier.png')
  tot = loadImage('assets/totem.png')
}

function setup() {
  fS = false
  log = loadImage('assets/new assets/log.png')
  bigRock = loadImage('assets/bRock.png')
  tree = loadImage('assets/tree.png')
  rockPatch = loadImage('assets/rockPatch.png')
  bigRock.resize(189, 111)
  log.resize(116, 68)
  tree.resize(141, 177)
  rockPatch.resize(159, 87)
  bg = loadImage('assets/Background.png');
  //localStorage.setItem('1000', 'Tom')
  //console.log(localStorage)



  createCanvas(windowWidth, windowHeight);
  w = 44
  h = 102
  skiX = (windowWidth / 2) - w
  skiY = (windowHeight / 2) - 30
  //requestPointerLock()
  snowInt()


}

function draw() {
  //menuScreen()
}

function playScreen(){
  ski1.resize(44, 102)
  skiR.resize(58, 92)
  skiL.resize(58, 92)
  tot.resize(52, 64)
  isFullScreen()
  isAlive()
  isPaused()
  resizeCanvas(windowWidth, windowHeight)
  if (alive == true && paused == false) {
    run()
  }
  else {
    cursor()
    if (paused && alive) {
      pauseScreen()
    }
    else if (alive == false) {
      deathScreen()
    }
  }
}

function menuScreen() {
  cursor()
  displayHS()
  let playButton = createButton('Play')
  playButton.position(100,0)
  //playButton.mousePressed(playing = true)
}

function displayHS() {
  textSize(50)
  text("High Score:" + hS, windowWidth - 100, windowHeight - 100)
}

function pauseScreen() {
  textSize(100)
  text('Game Paused', windowWidth / 2 - 200, windowHeight / 2 - 50)
  textSize(50)
  text('Press Return to Unpause', windowWidth / 2 - 100, windowHeight / 2 + 50)
  textSize(40)
  text(score, windowWidth - 150, 50)
}

function deathScreen() {
  textSize(150)
  fill('red')
  text('RIP', windowWidth / 2 - 150, windowHeight / 2 - 50)
  fill('black')
  textSize(40)
  text(score, windowWidth - 150, 50)
}

function run() {
  if (keyPressed('r')) {
    restartGame()
    key = 'lmao'
  }
  else if(keyPressed("ESCAPE")){
    restartGame()
    playing = false
  }
  else{  
    getHS()
    incSnowDensity()
    getDif()
    image(bg, 0, getBgY(), windowWidth, windowWidth * 4)
    image(bg, 0, getBgY() + 4 * windowWidth, windowWidth, windowWidth * 4)
    noCursor()
    intTrails()
    trailer()
    scarf()
    if (dAlready == false) {
      skimanDir()
    }
    skiPos()
    snowflakey()
    obstacleAdd()
    totemAdd()
    getScore()
    displayScore()
    lastSki[1] = skiY - 1.5 - 1.1 * dif}
  // if(isTotem()){
  //   filter(THRESHOLD)
  //   filterCoolDown += 100
  // }
  // if(filterCoolDown == 0){

  // }

}

function getHS(){
  if (score > hS){
    hS = score
  }
}

function restartGame() {
  bgY = 0
  startOfSnow = true
  score = 0
  safety = 10
  dif = 1
  d = 0
  dAlready = false
  totems = []
  lastSki = []
  filterCoolDown = 0
  speed = 0
  obstacles = []
  trails = []
  snowflakes = []
  alive = true
  w = 44
  h = 102
  skiX = (windowWidth / 2) - w
  skiY = (windowHeight / 2) - 30
  //requestPointerLock()
  snowInt()
}

function isTotem() {
  for (totem of totems) {
    rCorn = totem.x + totem.wid
    lCorn = totem.x
    if (d == 'l') {
      if (lCorn < skiX + w - 10 && rCorn > skiX && round(skiY + h, -1) == round(totem.y + totem.h, -1)) {
        return (true)
      }
    }
    else if (d == 'r') {
      if (lCorn < skiX + w && rCorn > skiX + 10 && round(skiY + h, -1) == round(totem.y + totem.h, -1)) {
        return (true)
      }
    }
    else if (d == 0) {
      if (lCorn < skiX + w && rCorn > skiX && round(skiY + 152, -1) == round(obstacle.y + obstacle.h, -1)) {
        return (true)
      }
    }
  }
}

function totemAdd() {
  if (objCoolDown > 0) {
    objCoolDown--
  }
  if (doesOccur(.05) && objCoolDown <= 0) {
    totems.push(new Totem(random(0, windowWidth - 52), windowHeight + 64, 52, 64, tot, dif))
    if (dif < 4) {
      objCoolDown += 400 - 100 * dif
    }
    else {
      objCoolDown += 100
    }
  }
  for (totem of totems) {
    totem.display()
    totem.move()
    if (totem.y + totem.h < 0) {
      totems.shift()
    }
    if (totem.y + totem.h < skiY + h && dAlready == false && skiY < totem.y + totem.h) {
      dAlready = true
      skimanDir()
    }
    else {
      dAlready = false
    }
  }
}

function scarf() {
  //let scarfSlope = (skiY - lastSki[1]) / (skiX - lastSki[0])
  let scarfRise = skiY - lastSki[1]
  let scarfRun = skiX - lastSki[0]
  let p1x
  let p3x
  if (d == 'l') {
    p1x = skiX + w / 2
    p3x = p1x - 10
  }
  else if (d == 'r') {
    p1x = skiX - 10 + w / 2
    p3x = p1x - 10
  }
  else {
    p1x = skiX - 5 + w / 2
    p3x = p1x - 10
  }
  let p1y = skiY + 25
  let p3y = skiY + 25
  let sLen1 = 10
  let sLen2 = 5
  let p2x = p1x - (sLen1 * scarfRun)
  let p4x = p3x - (sLen2 * scarfRun)
  let p2y = p1y - (sLen1 * scarfRise)
  let p4y = p3y - (sLen2 * scarfRise)
  strokeWeight(4)
  strokeCap(SQUARE)
  stroke(200, 100, 160)
  line(p1x, p1y, p2x, p2y)
  line(p3x, p3y, p4x, p4y)
  noStroke()
  //line(p1x, p1y, 

}

function isFullScreen() {
  if (keyPressed('f')) {
    if (fS == false) {
      fS = true
    }
    else {
      fS = false
    }
  }
  if (fS) {
    fullscreen(fS);
  }
}

function isAlive() {
  for (obstacle of obstacles) {
    rCorn = obstacle.x + obstacle.wid
    lCorn = obstacle.x
    if (d == 'l') {
      if (lCorn + obstacle.wid / 2 - 20 < skiX + w - 10 && lCorn + obstacle.wid / 2 + 20 > skiX && round(skiY + h, -2) == round(obstacle.y + obstacle.h, -2) && obstacle.pic == tree) {
        alive = false
      }
      else if (lCorn < skiX + w - 10 && rCorn > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y + 20 && obstacle.pic == bigRock) {
        alive = false
      }
      else if (lCorn - 10 < skiX + w - 10 && rCorn + 10 > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == rockPatch) {
        alive = false
      }
      else if (lCorn < skiX + w - 10 && rCorn > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == log) {
        alive = false
      }
    }
    else if (d == 'r') {
      if (lCorn + obstacle.wid / 2 - 20 < skiX + w && lCorn + obstacle.wid / 2 + 20 > skiX + 10 && round(skiY + h, -2) == round(obstacle.y + obstacle.h, -2) && obstacle.pic == tree) {
        alive = false
      }
      else if (lCorn < skiX + w && rCorn > skiX + 10 && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y + 20 && obstacle.pic == bigRock) {
        alive = false
      }
      else if (lCorn - 10 < skiX + w && rCorn + 10 > skiX + 10 && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == rockPatch) {
        alive = false
      }
      else if (lCorn < skiX + w && rCorn > skiX + 10 && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == log) {
        alive = false
      }
    }
    else if (d == 0) {
      if (lCorn + obstacle.wid / 2 - 20 < skiX + w && lCorn + obstacle.wid / 2 + 20 > skiX && round(skiY + 152, -2) == round(obstacle.y + obstacle.h, -2) && obstacle.pic == tree) {
        alive = false
      }
      else if (lCorn < skiX + w && rCorn > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y + 20 && obstacle.pic == bigRock) {
        alive = false
      }
      else if (lCorn - 10 < skiX + w && rCorn - 10 > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == rockPatch) {
        alive = false
      }
      else if (lCorn < skiX + w && rCorn > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == log) {
        alive = false
      }
    }
  }
}

function getDif() {
  dif += .0003
}

function isPaused() {
  if (keyPressed('Escape')) {
    paused = true
  }
  else if (keyPressed('Enter')) {
    paused = false
  }
}

function getScore() {

  score++
  if (safety > .5) {
    safety -= .005
  }
}

function displayScore() {
  fill('black')
  textFont(myFont)
  textSize(40)
  text(score, windowWidth - 150, 50)
}

function obstacleAdd() {
  if (objCoolDown > 0) {
    objCoolDown--
  }
  if (doesOccur(.1) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 189), windowHeight + 111, 189, 111, bigRock, dif))
    if (dif < 4) {
      objCoolDown += 200 - 35 * dif
    }
    else {
      objCoolDown += 60
    }
  }
  else if (doesOccur(.5) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 141), windowHeight + 177, 141, 177, tree, dif))
    if (dif < 4) {
      objCoolDown += 400 - 15 * dif
    }
    else {
      objCoolDown += 350
    }
  }
  else if (doesOccur(.5) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 116), windowHeight + 68, 116, 68, log, dif))
    if (dif < 4) {
      objCoolDown += 200 - 35 * dif
    }
    else {
      objCoolDown += 60
    }
  }
  else if (doesOccur(.15) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 159), windowHeight + 87, 159, 87, rockPatch, dif))
    if (dif < 4) {
      objCoolDown += 200 - 35 * dif
    }
    else {
      objCoolDown += 60
    }
  }
  for (obstacle of obstacles) {
    obstacle.display()
    obstacle.move()
    if (obstacle.y + obstacle.h < 0) {
      obstacles.shift()
    }
    if (obstacle.y + obstacle.h < skiY + h && dAlready == false && skiY < obstacle.y + obstacle.h) {
      dAlready = true
      skimanDir()
    }
    else {
      dAlready = false
    }
  }
}

function doesOccur(freq) {
  if (round(random(0, 100 * safety / freq), 4) <= 100) {
    return true
  }
  else {
    return false
  }
}

function skiPos() {
  lastSki[0] = skiX
  skiX += speed
  if (skiX <= 0) {
    speed = -speed
  }
  if (skiX >= windowWidth - w && d != 'r') {
    speed = -speed
  }
  else if (skiX >= windowWidth - w + 30) {
    speed = -speed
  }
}

function skimanDir() {

  if (keyPressed('a')) {
    w = 58
    d = 'l'
    h = 92

    if (speed > -3 - dif) {
      speed -= .04 * dif
    }
    image(skiL, skiX - 19, skiY, w, h)
  }
  else if (keyPressed('d')) {
    w = 58
    d = 'r'
    h = 92

    if (speed < 3 + dif) {
      speed += .04 * dif
    }
    image(skiR, skiX - 10, skiY, w, h)
  }
  else {
    d = 0
    w = 44
    h = 102
    image(ski1, skiX - 10, skiY - 5, w, h)
    if (speed > 0) {
      speed -= .04 * dif
    }
    else if (speed < 0) {
      speed += .04 * dif
    }
    else {
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



function incSnowDensity() {
  if (round(random(0, 1000 / dif) == 1)) {
    snowflakes.push(new Snow(random(0, windowHeight)))
  }
}

function snowInt() {
  for (snowI = 0; snowI < 500; snowI++) {
    snowflakes.push(new Snow(random(0, windowHeight), dif))
  }
}

function snowflakey() {
  for (let snowflake of snowflakes) {
    snowflake.display()
    snowflake.move()
    let chanceOfFall = random(0, 10)
    if ((snowflake.getY() >= windowHeight) || chanceOfFall < .035) {
      snowflake.y = 0
    }
  }
}

function getBgY() {
  if (d != 0) {
    bgY -= dif
    if (bgY < -windowWidth * 7) {
      bgY = -3 * windowWidth
    }
    return bgY
  }
  else {
    dif += .0001
    bgY -= dif
    if (bgY < -windowWidth * 7) {
      bgY = -3 * windowWidth
    }
    return bgY
  }
}


function intTrails() {
  trails.push(new Trails(skiX, skiY, dif))
}

function trailer() {
  for (trail of trails) {
    if (trail.y > 0) {
      trail.display()
      trail.move()
    }
    else {
      trails.shift()
    }
  }
}
