class Game{
    constructor(ctx){
        this.ctx = ctx
        this.screen = 0 //start, 1=game, 2=gameover
        this.points = 0
        this.snakeHead = new SnakeHead(ctx)
        this.snakeBody = []
        //this.food = new Food() //need to be create
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
            //this.reset();
            this.play()
             //this.frameId = window.requestAnimationFrame(this.play.bind(this));  
            break;
            case 2:
                
            break;
            default:
                console.log("This screen code is unknown")

        }
    }

    setCanvasToFullScreen(){
        this.ctx.canvas.height = window.innerHeight
        this.ctx.canvas.width= window.innerWidth
    }

    setEventHandlers(){
  
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
        this.snakeHead.draw(this.frameId)
        //this.snakeHead.move(this.frameId)
        this.frameId = requestAnimationFrame(this.play.bind(this))
    }
}