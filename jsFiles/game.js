class Game{
    constructor(ctx){
        this.ctx = ctx
        this.screen = 0 //start, 1=game, 2=gameover
        this.points = 0
        this.lives = 3
        this.snakeHead = null
        this.snakeBody = null
        this.snakeFullBody = [this.snakeHead, this.snakeBody]
        this.food = null
        this.frameId = null

    }

    init(){
            this.setCanvasToFullScreen()
            this.setEventHandlers()
            this.start()
        }

    start(){
        switch(this.screen){
            case 0:
                this.displaySplashStart();
            break;
            case 1:
            this.reset();
            this.play();    
            break;
            case 2:
                
            break;
            default:
                console.log("This screen code is unknown")

        }
    }

    setCanvasToFullScreen(){
        this.ctx.canvas.height = window.innerHeight - 100
        this.ctx.canvas.width= window.innerWidth
    }

    setEventHandlers(){
    
    window.addEventListener("keydown", (event) => {
        switch (event.code){
            case "ArrowUp":
                if((this.snakeHead.direction === "left") || (this.snakeHead.direction === "right"))
                {this.snakeHead.direction = "up"; console.log(this.snakeHead.direction)}
                else console.log("can't go this way");
            break;
            case "ArrowDown":
                if((this.snakeHead.direction === "left") || (this.snakeHead.direction === "right"))
                {this.snakeHead.direction = "down"; console.log(this.snakeHead.direction);break;}
                else
                console.log("can't go this way")
            break;
            case "ArrowLeft":
                if((this.snakeHead.direction === "up") || (this.snakeHead.direction === "down"))
                {this.snakeHead.direction = "left"; console.log(this.snakeHead.direction);break}
                else
                console.log("can't go this way")
            break;
            case "ArrowRight":
                if((this.snakeHead.direction === "up") || (this.snakeHead.direction === "down"))
                {this.snakeHead.direction = "right"; console.log(this.snakeHead.direction);break}
                else
                console.log("can't go this way")
            break;
            default:
                console.log("can't go this way")

        }
    })
}
  
    

    displaySplashStart(){
    const startButton = document.createElement("button");
    startButton.id = "set-start";
    startButton.innerText = "Start Game";
    startButton.onclick = () =>{
        this.screen = 1;
        this.start();
        startButton.remove();
    };
    document.body.appendChild(startButton)
}
    play(){
        if (this.snakeAteApple()) this.food.generateRandomPosition()

        this.snakeHead.draw(this.frameId)

        //drawing body
        switch(this.snakeHead.direction){
            case "right":
             this.snakeBody.drawRight(this.snakeHead.positionX+10, 
                                 this.snakeHead.positionY+27)
            break;   
            case "left":
             this.snakeBody.drawLeft(this.snakeHead.positionX+90, 
                                 this.snakeHead.positionY+28)
            break; 
            case "up":
             this.snakeBody.drawUp(this.snakeHead.positionX+27, 
                                 this.snakeHead.positionY+90)
            break; 
            case "down":
             this.snakeBody.drawDown(this.snakeHead.positionX+27, 
                                 this.snakeHead.positionY+10)
            break; 
        }

        this.food.draw()

        

        
       
        this.frameId = requestAnimationFrame(this.play.bind(this))
    }

    snakeAteApple(){
        if ((this.food.positionX < this.snakeHead.positionX && 
            this.snakeHead.positionX < this.food.positionX + this.food.width)&&(
            this.food.positionY<this.snakeHead.positionY &&
            this.snakeHead.positionY<this.food.positionY+this.food.height))
            return true
            
    }

    reset(){
        this.food = new Food(this.ctx)
        this.food.generateRandomPosition()
        this.snakeHead = new SnakeHead(this.ctx)
        this.snakeBody = new SnakeBody(this.ctx)
        
      

    }
}