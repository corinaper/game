class SnakeBody{
    constructor(ctx){
    

    this.positionX = 0
    this.positionY = 0
    //measurements for righ/left
    this.widthRL = 80
    this.heightRL = 45
    //measurements for up/down
    this.widthUD = 45
    this.heightUD = 80

    this.direction = "right" //"down" "left" "right"
    
    this.ctx = ctx
    }

    drawRight(x,y){
       const radius = 20;

       this.ctx.beginPath();
       this.ctx.moveTo(x, y);
       this.ctx.lineTo(x, this.heightRL+y);
       this.ctx.lineTo(x-this.widthRL, this.heightRL+y);
       this.ctx.lineTo(x-this.widthRL*1.5, this.heightRL/2+y);
       this.ctx.lineTo(x-this.widthRL, y);
       this.ctx.fill();
       
       this.ctx.fillStyle = "#A0C432"
    }

    drawLeft(x,y){
        const radius = 20;
 
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-3);
        this.ctx.lineTo(this.widthRL+x, y);
        this.ctx.lineTo(this.widthRL*1.5+x, this.heightRL/2+y);
        this.ctx.lineTo(this.widthRL+x, this.heightRL+y);
        this.ctx.lineTo(x, this.heightRL+y);
        this.ctx.fill();
        
        this.ctx.fillStyle = "#A0C432"
     }

     drawDown(x,y){
        const radius = 20;
 
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(this.widthUD+x, y);
        this.ctx.lineTo(this.widthUD+x, y-this.heightUD);
        this.ctx.lineTo(x+this.widthUD/2, y-this.heightUD*1.5);
        this.ctx.lineTo(x, y-this.heightUD);
        this.ctx.fill();
        
        this.ctx.fillStyle = "#A0C432"
     }

     drawUp(x,y){
        const radius = 20;
 
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(this.widthUD+x, y);
        this.ctx.lineTo(this.widthUD+x, y+this.heightUD);
        this.ctx.lineTo(x+this.widthUD/2, y+this.heightUD*1.5);
        this.ctx.lineTo(x, y+this.heightUD);
        this.ctx.fill();
        
        this.ctx.fillStyle = "#A0C432"
     }

}