
class Totem {


  constructor(x, y, wid, h, pic, dif) {
    this.pic = pic
    this.wid = wid
    this.h = h
    this.x = x
    this.y = y
    this.dif = dif
    this.dir = 0

  }

  display() {
    image(this.pic, this.x, this.y, this.wid, this.h)
  }

  move() {
    this.getDif()
    this.y -= this.dif * 2
  }

  getDif() {
    if (this.getDir() != 0) {
      this.dif += .0006
    }
    else {
      this.dif += .0008
    }
  }

  getDir() {
    if (keyPressed('a')) {
      this.dir = 'l'
    }
    else if (keyPressed('d')) {
      this.dir = 'r'
    }
    else {
      this.dir = 0
    }
    return this.dir
  }

  keyPressed(k) {
    if (key == k) {
      return true
    }
    else {
      return false;
    }
  }
}