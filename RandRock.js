class RandRock extends Obstacle {
    constructor(x, y, wid, pic, dif){
        super(x, y, wid, wid, pic, dif)
        this.x = x
        this.y = y
        this.wid = wid
        this.h = wid
        this.pic = pic
        this.dif = dif
    }

    display(){
        super.display()
    }
}