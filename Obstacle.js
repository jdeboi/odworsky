class Obstacle{
    
    constructor(x, y, wid, h, pic, dif){
        this.pic = pic
        this.wid = wid
        this.h = h
        this.x = x
        this.y = y
        this.dif = dif
    }

    display(){
        image(this.pic, this.x, this.y, this.wid, this.h)
    }

    move(){
        this.getDif()
        this.y-=this.dif*2
    }

    getDif(){
        this.dif+=.0005
    }
}