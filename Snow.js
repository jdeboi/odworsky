class Snow {
    constructor (y, dif){
        noStroke()
        this.x = random(0, windowWidth)
        this.y = y
        this.col = 'white'
        this.w = random(0, 5)
        if(dif<3.5){
            this.speed = 4-dif
        }
        else{
            this.speed = .5
        }
        this.invCount = 0
    }

    display(){
        fill(this.col)
        rect(this.x, this.y, this.w)
    }

    inv(){
        if(this.invCount>0){
            this.invCount --
            fill('black')
            rect(this.x, this.y, this.w*20)
        }
        if(round(random(1,50)) == 1 && this.invCount == 0){
            this.invCount += 100
        }
    }

    move(){
        this.y += this.speed
    }

    getY(){
        return this.y
    }
}