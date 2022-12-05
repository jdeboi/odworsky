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
let invCoolDown = 0
let hS
let isInv = false
let playing = false
let doInvert = false



function preload() {
  myFont = loadFont('assets/Pixel Coleco.otf');
  skiR = loadImage('assets/riSki.png')
  skiL = loadImage('assets/leSki.png')
  ski1 = loadImage('assets/skier.png')
  tot = loadImage('assets/totem.png')
}

function setup() {
  textAlign(CENTER)
  textFont(myFont)
  fS = false
  bridge = loadImage('assets/bridge.png')
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
  if (localStorage == undefined) {
    localStorage.setItem('Highscore', 0)
  }
  hS = localStorage.getItem('Highscore')
  if (playing == false) {
    menuScreen()
  } else {
    playScreen()
  }

}

function playScreen() {
  playing = true
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
  isFullScreen()
  resizeCanvas(windowWidth, windowHeight)
  cursor()
  displayHS()
  textSize(100)
  text("SKI GAME", windowWidth / 2, windowHeight / 2 - 100)
  textSize(40)
  text("Press Return to Play", windowWidth / 2, windowHeight / 2 + 50)
  if (keyPressed("Enter")) {
    playing = true
  }
}

function displayHS() {
  textSize(50)
  text("High Score:" + hS, windowWidth / 2, windowHeight - 100)
}

function pauseScreen() {
  textSize(100)
  text('Game Paused', windowWidth / 2, windowHeight / 2 - 50)
  textSize(50)
  text('Press Return to Unpause', windowWidth / 2, windowHeight / 2 + 50)
  text('Press "M" to Return to Menu', windowWidth / 2, windowHeight / 2 + 100)
  if (keyPressed('m')) {
    restartGame()
    playing = false
  }
  textSize(40)
  text(score, windowWidth - 70, 50)
}

function deathScreen() {
  textSize(150)
  fill('red')
  text('RIP', windowWidth / 2, windowHeight / 2 - 50)
  fill('black')
  textSize(40)
  text('Press Return to Restart', windowWidth / 2, windowHeight / 2 + 50)
  if (keyPressed("Enter")) {
    restartGame()
  }
  text(score, windowWidth - 70, 50)
  displayHS()
}

function run() {
  if (keyPressed('r')) {
    restartGame()
    key = 'lmao'
  }
  else if (keyPressed("escape")) {
    playing = false
    restartGame()
  }
  else {
    getHS()
    if (isTotem() || (invCoolDown <= 0 && isInv)) {
      if (isTotem() && isInv == false) {
        score += 1000
        invCoolDown += 1000
        isInv = true
        totems = []
        doInvert = true
        inv(log)
        inv(bigRock)
        inv(tree)
        inv(rockPatch)
        inv(bridge)
        // inv(skiR)
        // inv(skiL)
        // inv(ski1)
        inv(tot)
        inv(bg)
        doInvert = false
      }
      else if (isTotem()) {
        score += 1000
        invCoolDown += 100
        totems = []
      }
      if (invCoolDown == 0 && isInv) {
        isInv = false
        doInvert = true
        inv(log)
        inv(bigRock)
        inv(tree)
        inv(rockPatch)
        inv(bridge)
        // inv(skiR)
        // inv(skiL)
        // inv(ski1)
        inv(tot)
        inv(bg)
        doInvert = false
      }

    }
    if (invCoolDown > 0) {
      invCoolDown--
    }
    if (isInv) {
      // skiX+=random(-1,1)
      if (speed > 1) {
        speed -= .2
      } else if (speed < -1) {
        speed += .2
      }

    }
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
    obstacleAdd()
    totemAdd()
    incSnowDensity()
    snowflakey()
    getScore()
    displayScore()
    lastSki[1] = skiY - 1.5 - 1.1 * dif
  }


}


function inv(img) {
  if (doInvert) {

    // Load the pixels
    img.loadPixels();

    // Loop through the pixels X and Y
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {

        // Calculate the pixel index
        const index = (y * img.width + x) * 4;

        // Get the red, green, and blue values
        const r = img.pixels[index + 0];
        const g = img.pixels[index + 1];
        const b = img.pixels[index + 2];

        // Invert the colors
        img.pixels[index + 0] = 255 - r;
        img.pixels[index + 1] = 255 - g;
        img.pixels[index + 2] = 255 - b;

      }
    }

    // We're finished working with pixels so update them
    img.updatePixels();

    // Don't do invert again until we set it to true on click;
  }
}

function getHS() {
  if (score > hS) {
    localStorage.clear()
    localStorage.setItem("Highscore", score + 2)
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
  invCoolDown = 0
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
      if (lCorn < skiX + w - 10 && rCorn > skiX && round(skiY + h, -2) == round(totem.y + totem.h, -2)) {
        return (true)
      }
    }
    else if (d == 'r') {
      if (lCorn < skiX + w && rCorn > skiX + 10 && round(skiY + h, -2) == round(totem.y + totem.h, -2)) {
        return (true)
      }
    }
    else if (d == 0) {
      if (lCorn < skiX + w && rCorn > skiX && round(skiY + 152, -2) == round(totem.y + totem.h, -2)) {
        return (true)
      }
    }
  }
}

function totemAdd() {
  if (objCoolDown > 0) {
    objCoolDown--
  }
  if (doesOccur(.08) && objCoolDown <= 0) {
    totems.push(new Totem(random(0, windowWidth - 52), windowHeight + 64, 52, 64, tot, dif))
    if (dif < 4) {
      objCoolDown += 400 - 50 * dif
    }
    else {
      objCoolDown += 200
    }
  }
  for (totem of totems) {
    totem.display()
    totem.move()
    totem.display()
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
      else if (windowWidth / 2 - 100 > skiX + w - 10 && windowWidth / 2 + 100 < skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == bridge) {
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
      else if (windowWidth / 2 - 100 > skiX + w && windowWidth / 2 + 100 < skiX + 10 && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == bridge) {
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
      else if (windowWidth / 2 - 100 > skiX + w && windowWidth / 2 + 100 < skiX && skiY + h < obstacle.y + obstacle.h && skiY + h > obstacle.y && obstacle.pic == bridge) {
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
  if (isInv) {
    fill('white')
  }
  else {
    fill('black')
  }
  textFont(myFont)
  textSize(40)
  text(score, windowWidth - 70, 50)
  fill('black')
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
  if (doesOccur(2) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 141), windowHeight + 177, 141, 177, tree, dif))
    if (dif < 4) {
      objCoolDown += 500 - 5 * dif
    }
    else {
      objCoolDown += 450
    }
  }
  if (doesOccur(.3) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 116), windowHeight + 68, 116, 68, log, dif))
    if (dif < 4) {
      objCoolDown += 200 - 5 * dif
    }
    else {
      objCoolDown += 150
    }
  }
  if (doesOccur(.1) && objCoolDown <= 0) {
    obstacles.push(new Obstacle(random(0, windowWidth - 159), windowHeight + 87, 159, 87, rockPatch, dif))
    if (dif < 4) {
      objCoolDown += 200 - 35 * dif
    }
    if (doesOccur(1) && objCoolDown <= 0) {
      obstacles.push(new Obstacle((windowWidth-2700)/2, windowHeight + 2700, 2700, 2700, bridge, dif))
      if (dif < 4) {
        objCoolDown += 900 - 50 * dif
      }
      else {
        objCoolDown += 500
      }
    }
  }
  for (obstacle of obstacles) {
    obstacle.display()
    obstacle.move()
    obstacle.display()
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
      speed -= .08 * dif
    }
    image(skiL, skiX - 19, skiY, w, h)
  }
  else if (keyPressed('d')) {
    w = 58
    d = 'r'
    h = 92

    if (speed < 3 + dif) {
      speed += .08 * dif
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
    if (isInv) {
      snowflake.inv()
    } else {
      snowflake.display()
    }
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
