class SnakeHead{
    constructor(ctx){

    this.positionX = 0
    this.positionY = 0
    this.width = 100
    this.height = 100
    this.direction = "up" //"down" "left" "right"
    this.speed = 10

    this.ctx = ctx
    //Headup
    this.imgUp = new Image()
    this.imgUp.src = "./images/snakeUp.png"
    //HeadDown
    this.imgDown = new Image()
    this.imgDown.src = "./images/snakeDown.png"
    //HeadRight
    this.imgRight = new Image()
    this.imgRight.src = "images/snakeRight.png"
    //HeadLeft
    this.imgLeft = new Image()
    this.imgLeft.src = "images/snakeLeft.png"

    }
    
    animate(frameId) {
        switch(this.direction){
        case "up":
           if(this.positionY<this.imgUp.height){
           this.positionY = this.ctx.canvas.height
           } else 
           this.positionY -=Math.floor((frameId / 10) % this.ctx.canvas.height);;
           console.log("moving up", this.positionY)
        break;
        case "down":
            if(this.positionY>this.ctx.canvas.height){
                this.positionY = 0
            } else this.positionY +=5
        break;
        case "left":
            if(this.positionX<0){
                this.positionX = this.ctx.canvas.width
            } else this.positionX -=Math.floor((frameId / 10) % this.ctx.canvas.width);
        break;
        case "right":
            if(this.positionX>this.ctx.canvas.width){
                this.positionX = 0
            } else this.positionX +=5
        break;
        default:
            if(this.positionY<0+this.imgUp.height){
                this.positionY = this.ctx.canvas.height-this.imgUp.height
                } else this.positionY -=5;
    }  
    
      }

      

    draw(frameId){
        this.animate(frameId)
        switch(this.direction){
            case "up":
                this.ctx.drawImage( 
                    this.imgUp,
                    this.positionX,
                    this.positionY,
                    this.width,
                    this.height)
                    console.log("drawing Up")
            break;
            case "down":
                this.ctx.drawImage( 
                    this.imgDown,
                    this.positionX,
                    this.positionY,
                    this.width,
                    this.height)
            break;
            case "right":
                this.ctx.drawImage( 
                    this.imgRight,
                    this.positionX,
                    this.positionY,
                    this.width,
                    this.height)
            break;
            case "left":
                this.ctx.drawImage( 
                    this.imgLeft,
                    this.positionX,
                    this.positionY,
                    this.width,
                    this.height)
            break;
        }
    }

    

    move(frameId){
    
    

    }


}