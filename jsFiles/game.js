class Game {
	constructor(ctx) {
		this.ctx = ctx;
		this.screen = 0; //start, 1=game, 2=gameover
		this.points = 0;
		this.lifes = 3;
		this.snakeHead = null;
		this.snakeBody = null;
		this.snakeFullBody = [];
		this.food = [];
		this.frameId = null;
		this.foxes = []; 
        
	}
 audioCollect = new Audio("sounds/zapsplat_multimedia_game_sound_digital_fast_collect_item_002_55830.mp3")
 mainAudio = new Audio("sounds/mixkit-at-the-barn-789.mp3")
overAudio = new Audio("sounds/zapsplat_multimedia_game_sound_bell_digital_synth_bright_harsh_negative_001_40476.mp3")
   

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
        const image = document.querySelector(".flexCenter img")

		this.ctx.canvas.height = image.height - 160;
		this.ctx.canvas.width = image.width - 200;
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
		startDiv.style.width = document.querySelector(".flexCenter img").width
		startDiv.style.height = document.querySelector(".flexCenter img").height + 20 + "px"
		const startButton = document.createElement('button');
		const startImage = document.createElement('img');
        const text = document.createElement('p');
        text.innerText = "Feed the bunny without being catched by the foxes"
		startDiv.id = 'set-start';
		startButton.innerText = 'Feed Me';
		startButton.id = 'button';
		startImage.src = 'images/rabbit1.png';
		startImage.id = 'moving-rabbit';
		startButton.onclick = () => {
			this.screen = 1;
			this.start();
			startDiv.remove();
          
        
		};

		document.querySelector(".flexCenter").appendChild(startDiv);

		startDiv.appendChild(startImage);
        startDiv.appendChild(text);
		startDiv.appendChild(startButton);
	}

   
	play() {
        this.mainAudio.play()
		if (this.rabbitAteFood()) {
			this.points += 1;
            
			document.getElementById('score').innerText = this.points;
            if(this.food.length<4){
                this.food.push(new Food(this.ctx))
            } else this.food.pop()
            this.audioCollect.play()
            
		}

		this.snakeHead.draw(this.frameId);

		this.food.forEach(carrot => carrot.draw());

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
        let bunnyAteFood = false;
        
		this.food.forEach((carrot)=>{if (
			carrot.positionX < this.snakeHead.positionX &&
			this.snakeHead.positionX < carrot.positionX + carrot.width &&
			(carrot.positionY < this.snakeHead.positionY &&
				this.snakeHead.positionY < carrot.positionY + carrot.height)
		)
        bunnyAteFood = true;if (bunnyAteFood)carrot.generateRandomPosition()})
        

		return bunnyAteFood;
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
		this.food.push(new Food(this.ctx));
		this.food.forEach(carrot => carrot.generateRandomPosition());
		this.points = 0;
		document.getElementById('score').innerText = 0;
		this.snakeHead = new SnakeHead(this.ctx);
	}

	gameOver() {
		this.fox = null;
		this.food = [];
		this.snakeHead = null;
        this.foxes = [];

        this.mainAudio.pause()
        this.overAudio.play()

		const startDiv = document.createElement('div');
		startDiv.style.width = document.querySelector(".flexCenter img").width + 'px';
		startDiv.style.height = document.querySelector(".flexCenter img").height + 'px';
		startDiv.style.width = this.ctx.canvas.width;
		const text = document.createElement('p');
		const startButton = document.createElement('button');
		const startImage = document.createElement('img');
		startDiv.id = 'set-start';
		startButton.innerText = 'Try Again';
		text.innerText = 'The bunny is dead';
		text.id = 'game-over';
		startButton.id = 'button';
		startImage.src = 'images/dead bunny.png';
		startImage.id = 'moving-rabbit';

		startButton.onclick = () => {
			this.screen = 1;
			this.start();
			startDiv.remove();
		};

		document.querySelector(".flexCenter").appendChild(startDiv);
		startDiv.appendChild(startImage);
		startDiv.appendChild(text);
		startDiv.appendChild(startButton);
	}
}
