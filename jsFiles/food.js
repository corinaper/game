class Food{
    constructor(ctx){
        this.ctx = ctx
        this.img = new Image()
        this.img.src = "images/cabbage.png"

        this.positionX = 0
        this.positionY = 0
        this.width = 50
        this.height = 50
    }

    generateRandomPosition(){
        this.positionX = Math.floor(Math.random() * (this.ctx.canvas.width - this.width))
        this.positionY = Math.floor(Math.random() * (this.ctx.canvas.height - this.height))
    }

    draw(){
       
        this.ctx.drawImage( 
            this.img,
            this.positionX,
            this.positionY,
            this.width,
            this.height)
    }
}
