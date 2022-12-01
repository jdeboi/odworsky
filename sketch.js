let bg;
let lastSki
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
  skiR = loadImage('assets/riSki.png')
  skiL = loadImage('assets/leSki.png')
  ski1 = loadImage('assets/skier.png')
}

function setup() {
  fS = false
  log = loadImage('assets/new assets/log.png')
  bigRock = loadImage('assets/bRock.png')
  tree = loadImage('assets/tree.png')
  rockPatch = loadImage('assets/rockPatch.png')
  bigRock.resize(189, 111)
  log.resize(116,68)
  tree.resize(141, 177)
  rockPatch.resize(159, 87)
  bg = loadImage('assets/Background.png');
  // ski2 = loadImage('assets/ski2.png')
  // skiR = loadImage('assets/riSki.png')
  // skiL = loadImage('assets/leSki.png')

  createCanvas(windowWidth, windowHeight);
  w = 44
  h = 102
  skiX = (windowWidth / 2) - w / 2
  skiY = (windowHeight / 2) - 63
  //requestPointerLock()
  snowInt()


}

function draw() {
  ski1.resize(44, 102)
  skiR.resize(58, 92)
  skiL.resize(58, 92)
  lastSki = [skiX, skiY]
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
  lastSki = [skiX, skiY]
  scarf()
  incSnowDensity()
  getDif()
  image(bg, 0, getBgY(), windowWidth, windowWidth * 4)
  image(bg, 0, getBgY() + 4 * windowWidth, windowWidth, windowWidth * 4)
  noCursor()
  intTrails()
  trailer()
  if (dAlready == false) {
    skimanDir()
  }
  skiPos()
  snowflakey()
  obstacleAdd()
  getScore()
  displayScore()
}

function scarf() {
  let scarfSlope = (skiY - lastSki[1]) / (skiX - lastSki[0])
  let p1x = skiX + w / 2
  let p1y = skiY - 10
  let sLen = 10
  //let p2x = p1x+(sLen-)
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
      else if (lCorn < skiX + w -10 && rCorn > skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == log) {
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
  dif += .0005
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
  if (oCoolDown > 0) {
    oCoolDown--
  }
  if (doesOccur(.1) && oCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 189), windowHeight + 111, 189, 111, bigRock, dif))
    if (dif < 4) {
      oCoolDown += 200 - 35 * dif
    }
    else {
      oCoolDown += 60
    }
  }
  else if (doesOccur(.5) && oCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 141), windowHeight + 177, 141, 177, tree, dif))
    if (dif < 4) {
      oCoolDown += 200 - 35 * dif
    }
    else {
      oCoolDown += 60
    }
  }
  else if (doesOccur(.5) && oCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 116), windowHeight + 68, 116, 68, log, dif))
    if (dif < 4) {
      oCoolDown += 200 - 35 * dif
    }
    else {
      oCoolDown += 60
    }
  }
  else if (doesOccur(.15) && oCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 159), windowHeight + 87, 159, 87, rockPatch, dif))
    if (dif < 4) {
      oCoolDown += 200 - 35 * dif
    }
    else {
      oCoolDown += 60
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
  skiX += speed
  if (skiX < -w) {
    skiX = windowWidth
  }
  if (skiX > windowWidth) {
    skiX = -w
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
    image(skiR, skiX - 19, skiY, w, h)
  }
  else {
    d = 0
    w = 44
    h = 102
    image(ski1, skiX, skiY - 5, w, h)
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
