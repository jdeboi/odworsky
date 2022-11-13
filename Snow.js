class Snow {
    constructor (y, dif){
        noStroke()
        this.x = random(0, windowWidth)
        this.y = y
        this.col = color(255, 255, 255)
        this.w = random(0, 5)
        this.speed = 1+dif
    }

    display(){
        fill(this.col)
        rect(this.x, this.y, this.w)
    }

    move(){
        this.y += this.speed
    }

    getY(){
        return this.y
    }
}