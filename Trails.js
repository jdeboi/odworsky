class Trails {
    constructor(x, y, dif){
        this.x = x
        this.y = y+70
        this.w = 8
        this.h = dif*2
        //this.mW = mW
    }
    

    display(){
        noStroke()
        fill(0, 0, 0, 10)
        rect(this.x, this.y, this.w, this.h)
        rect(this.x+26-this.w, this.y, this.w, this.h)
    }

    move(){
        this.y -= this.h
    }
}