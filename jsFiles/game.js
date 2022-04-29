class Game {
	constructor(ctx) {
		this.ctx = ctx;
		this.screen = 0; //start, 1=game, 2=gameover
		this.points = 0;
		this.lifes = 3;
		this.snakeHead = null;
		this.snakeBody = null;
		this.snakeFullBody = [];
		this.food = null;
		this.frameId = null;
		this.foxes = [];
	}

	init() {
		this.setCanvasToFullScreen();
		this.setEventHandlers();
		this.start();
	}

	start() {
		switch (this.screen) {
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
				console.log('This screen code is unknown');
		}
	}

	setCanvasToFullScreen() {
		this.ctx.canvas.height = window.innerHeight - 170;
		this.ctx.canvas.width = window.innerWidth - 150;
	}

	setEventHandlers() {
		window.addEventListener('keydown', (event) => {
			switch (event.code) {
				case 'ArrowUp':
					if (this.snakeHead.direction === 'left' || this.snakeHead.direction === 'right') {
						this.snakeHead.direction = 'up';
						console.log(this.snakeHead.direction);
					} else console.log("can't go this way");
					break;
				case 'ArrowDown':
					if (this.snakeHead.direction === 'left' || this.snakeHead.direction === 'right') {
						this.snakeHead.direction = 'down';
						console.log(this.snakeHead.direction);
						break;
					} else console.log("can't go this way");
					break;
				case 'ArrowLeft':
					if (this.snakeHead.direction === 'up' || this.snakeHead.direction === 'down') {
						this.snakeHead.direction = 'left';
						console.log(this.snakeHead.direction);
						break;
					} else console.log("can't go this way");
					break;
				case 'ArrowRight':
					if (this.snakeHead.direction === 'up' || this.snakeHead.direction === 'down') {
						this.snakeHead.direction = 'right';
						console.log(this.snakeHead.direction);
						break;
					} else console.log("can't go this way");
					break;
				default:
					console.log("can't go this way");
			}
		});
	}

	displaySplashStart() {
		const startDiv = document.createElement('div');
		startDiv.style.width = this.ctx.canvas.width + 'px';
		startDiv.style.height = this.ctx.canvas.height + 'px';
		const startButton = document.createElement('button');
		const startImage = document.createElement('img');
		startDiv.id = 'set-start';
		startButton.innerText = 'Feed Me';
		startButton.id = 'button';
		startImage.src = '/images/rabbit1.png';
		startImage.id = 'moving-rabbit';
		startButton.onclick = () => {
			this.screen = 1;
			this.start();
			console.log(startDiv);
			startDiv.remove();
		};

		document.body.appendChild(startDiv);

		startDiv.appendChild(startImage);
		startDiv.appendChild(startButton);
	}
	play() {
		if (this.rabbitAteFood()) {
			this.food.generateRandomPosition();
			this.points += 1;
			document.getElementById('score').innerText = this.points;
		}

		this.snakeHead.draw(this.frameId);

		this.food.draw();

		if (this.frameId % 250 == 0 ) {
			if(Math.random()<0.4)this.foxes.push(new Fox(this.ctx));
			this.foxes.map((fox) => fox.generateRandomPosition());
		}

		if (this.frameId % 1000 == 0) {
			this.snakeHead.speed += 1;
			this.snakeHead.runSpeed -= 1;
		}

		this.foxes.forEach((fox) => fox.draw());

		//  if(this.frameId % 1600 == 0 ){
		//      this.fox = null}

		this.frameId = requestAnimationFrame(this.play.bind(this));

		if (this.foxAteRabbit()) {
			cancelAnimationFrame(this.frameId);
			this.gameOver(this.frameId);
		}
	}

	rabbitAteFood() {
		if (
			this.food.positionX < this.snakeHead.positionX &&
			this.snakeHead.positionX < this.food.positionX + this.food.width &&
			(this.food.positionY < this.snakeHead.positionY &&
				this.snakeHead.positionY < this.food.positionY + this.food.height)
		)
			return true;
	}

	foxAteRabbit() {
		let bunnyDead = false;
        this.foxes.forEach((fox)=>{if (
			fox.positionX < this.snakeHead.positionX &&
			this.snakeHead.positionX < fox.positionX + fox.width &&
			(fox.positionY < this.snakeHead.positionY &&
				this.snakeHead.positionY < fox.positionY + fox.height)
		)
			bunnyDead = true;})

		return bunnyDead;
	}

	reset() {
		this.food = new Food(this.ctx);
		this.food.generateRandomPosition();
		this.points = 0;
		document.getElementById('score').innerText = 0;
		this.snakeHead = new SnakeHead(this.ctx);
	}

	gameOver(frameId) {
		this.fox = null;
		this.food = null;
		this.snakeHead = null;

		const startDiv = document.createElement('div');
		startDiv.style.width = this.ctx.canvas.width + 'px';
		startDiv.style.height = this.ctx.canvas.height + 'px';

		startDiv.style.width = this.ctx.canvas.width;
		const text = document.createElement('p');
		const startButton = document.createElement('button');
		const startImage = document.createElement('img');
		startDiv.id = 'set-start';
		startButton.innerText = 'Try Again';
		text.innerText = 'The bunny is dead';
		text.id = 'game-over';
		startButton.id = 'button';
		startImage.src = '/images/dead bunny.png';
		startImage.id = 'moving-rabbit';

		startButton.onclick = () => {
			this.screen = 1;
			this.start();
			startDiv.remove();
		};

		document.body.appendChild(startDiv);
		startDiv.appendChild(startImage);
		startDiv.appendChild(text);
		startDiv.appendChild(startButton);
	}
}
