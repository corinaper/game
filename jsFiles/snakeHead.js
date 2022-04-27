class SnakeHead {
	constructor(ctx) {
		this.positionX = 0;
		this.positionY = 0;
		this.width = 100;
		this.height = 100;
		this.direction = 'up'; //"down" "left" "right"
		this.speed = 1.5;

		this.ctx = ctx;
		//Headup
		this.imgUp = new Image();
		this.imgUp.src = './images/snakeUp.png';
		//HeadDown
		this.imgDown = new Image();
		this.imgDown.src = './images/snakeDown.png';
		//HeadRight
		this.imgRight = new Image();
		this.imgRight.src = 'images/snakeRight.png';
		//HeadLeft
		this.imgLeft = new Image();
		this.imgLeft.src = 'images/snakeLeft.png';
	}

	animate(frameId) {
		switch (this.direction) {
			case 'up':
				if (this.positionY < 0 - this.imgUp.height) {
					this.positionY = this.ctx.canvas.height;
				} else this.positionY -= this.speed;
				break;
			case 'down':
				if (this.positionY - this.imgRight.height > this.ctx.canvas.height) {
					this.positionY = 0 - this.imgDown.height / 2;
				} else this.positionY += this.speed;
				break;
			case 'left':
				if (this.positionX < 0 - this.imgLeft.width) {
					this.positionX = this.ctx.canvas.width;
				} else this.positionX -= this.speed;
				break;
			case 'right':
				if (this.positionX - this.imgRight.width > this.ctx.canvas.width) {
					this.positionX = 0;
				} else this.positionX += this.speed;
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
				this.ctx.drawImage(this.imgUp, this.positionX - (this.width/2), this.positionY, this.width, this.height);
				console.log('drawing Up');
				break;
			case 'down':
				this.ctx.drawImage(this.imgDown, this.positionX-(this.width/2), this.positionY-(this.height), this.width, this.height);
				break;
			case 'right':
				this.ctx.drawImage(this.imgRight, this.positionX-this.width, this.positionY-(this.height/2), this.width, this.height);
				break;
			case 'left':
				this.ctx.drawImage(this.imgLeft, this.positionX, this.positionY-this.width/2, this.width, this.height);
				break;
		}
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, 10, 0, 2 * Math.PI);
        ctx.stroke();
	}

	move(frameId) {}
}
