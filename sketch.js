let bg;
let ski1
let ski2
let skier;

function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  let skiX = windowWidth/2
  let skiY = windowHeight/2
  bg = loadImage('assets/Background.png');
  ski1 = loadImage('assets/ski1.png')
  ski2 = loadImage('assets/ski2png')
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(bg);
  image(bg, 0, 0, windowWidth, windowHeight*4)
  image(getSkier(), skiX, skiY)

}

function getSkier(){
  if (random(1,2) == 1){
    skier = ski1
  }
  else{
    skier = ski2
  }
  return skier
}

function getSkierX(){
}