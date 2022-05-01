class SnakeHead {
	constructor(ctx) {
		this.positionX = 10;
		this.positionY = 60;
		this.direction = 'right'; //"down" "left" "right"
		this.speed = 3;
		this.runSpeed = 8

		this.ctx = ctx;
		//Headup
		this.imgUp = new Image();
		this.imgUp.src = 'images/rabbit back.png';
		this.width = 58;
		this.height = 60;
		//HeadDown
		this.imgDown = new Image();
		this.imgDown.src = 'images/rabbit front.png';
		
		this.widthDown = 62;
		this.heightDown = 74;
		//HeadRight
		this.imgRight = new Image();
		this.imgRight.src = 'images/rabbit right.png';
		
		
		this.widthRight = 58;
		//HeadLeft
		this.imgLeft = new Image();
		this.imgLeft.src = 'images/rabbit left.png';
		
		this.spriteNumber = 0;
		this.spriteCount = 4
	}

	animateMoves(frameId){
		this.spriteNumber = Math.floor((frameId / this.runSpeed) % this.spriteCount);
	}



	animate(frameId) {
		switch (this.direction) {
			case 'up':
				if (this.positionY < 0 - this.imgUp.height) {
					this.positionY = this.ctx.canvas.height;
				} else this.positionY -= this.speed;
				this.animateMoves(frameId)
				break;
			case 'down':
				if (this.positionY - this.imgRight.height > this.ctx.canvas.height) {
					this.positionY = 0 - this.imgDown.height / 2;
				} else this.positionY += this.speed;
				this.animateMoves(frameId)
				break;
			case 'left':
				if (this.positionX < 0 - this.imgLeft.width) {
					this.positionX = this.ctx.canvas.width;
				} else this.positionX -= this.speed;
				this.animateMoves(frameId)
				break;
			case 'right':
				if (this.positionX - this.imgRight.width > this.ctx.canvas.width) {
					this.positionX = 0;
				} else this.positionX += this.speed;
				this.animateMoves(frameId)
				break;
			default:
				if (this.positionY < 0 + this.imgUp.height) {
					this.positionY = this.ctx.canvas.height - this.imgUp.height;
				} else this.positionY -= this.speed;
		}
	}

	draw(frameId) {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.animate(frameId);
		switch (this.direction) {
			case 'up':
				const sxU = this.spriteNumber * this.widthRight;
				const syU = 0;
				const sWidthU = this.widthDown;
				const sHeightU = this.heightDown;
			
				const dxU = this.positionX-this.widthDown/2;
				const dyU = this.positionY-(this.heightDown/2);
				const dWidthU = this.widthDown;
				const dHeightU = this.heightDown;
			
				this.ctx.drawImage(
				  this.imgUp,
				  sxU,
				  syU,
				  sWidthU,
				  sHeightU,
				  dxU,
				  dyU,
				  dWidthU,
				  dHeightU)

				break;
			case 'down':
				const sxD = this.spriteNumber * this.widthRight;
				const syD = 0;
				const sWidthD = this.widthDown;
				const sHeightD = this.heightDown;
			
				const dxD = this.positionX-this.widthDown/2;
				const dyD = this.positionY-(this.heightDown/2);
				const dWidthD = this.widthDown;
				const dHeightD = this.heightDown;
			
				this.ctx.drawImage(
				  this.imgDown,
				  sxD,
				  syD,
				  sWidthD,
				  sHeightD,
				  dxD,
				  dyD,
				  dWidthD,
				  dHeightD
				);
				break;
			case 'right':

				const sxR = this.spriteNumber * this.widthRight;
				const syR = 0;
				const sWidthR = this.widthRight;
				const sHeightR = this.height;
			
				const dxR = this.positionX-this.widthRight/2;
				const dyR = this.positionY-(this.height/2);
				const dWidthR = this.widthRight;
				const dHeightR = this.height;
			
				this.ctx.drawImage(
				  this.imgRight,
				  sxR,
				  syR,
				  sWidthR,
				  sHeightR,
				  dxR,
				  dyR,
				  dWidthR,
				  dHeightR
				);
				
				break;
			case 'left':
				const sxL = this.spriteNumber * this.widthRight;
				const syL = 0;
				const sWidthL = this.widthRight;
				const sHeightL = this.height;
			
				const dxL = this.positionX-this.widthRight/2;
				const dyL = this.positionY-(this.height/2);
				const dWidthL = this.widthRight;
				const dHeightL = this.height;
				
				this.ctx.drawImage(
					this.imgLeft,
					sxL,
					syL,
					sWidthL,
					sHeightL,
					dxL,
					dyL,
					dWidthL,
					dHeightL
				  );
				break;
		}
      
	}

}
