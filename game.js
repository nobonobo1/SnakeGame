
class Game {

	constructor() {

		// Initial matrix settings:
		this.matrixName = 'matrix';
		this.rowQuantity = 20;
		this.colQuantity = 20;

		// Initial snake settings:
		this.snakeRow = 1;
		this.snakeCol = 1;
		this.snakeSetColor = 'green';
		this.snakeUnsetColor = 'clearGreen';
		this.snakeDirection = 'ArrowRight';
		this.movingInterval = 275;

		// Initial apple settings:
		// this.rowQuantity
		// this.colQuantity
		this.appleSetColor = 'red';
		this.appleUnsetColor = 'clearRed';
	}
	
	// Creating field, snake and apple
	create() {

		// Creating matrix by its settings
		this.matrix = new Matrix (
			this.matrixName, 
			this.rowQuantity, 
			this.colQuantity
		);
		this.matrix.create();

		// Creating snake by its settings
		this.snake = new Snake (
			this.snakeRow, 
			this.snakeCol,
			this.snakeSetColor,
			this.snakeUnsetColor,
			this.snakeDirection,
			this.movingInterval
		);
		this.snake.create();

		// Creating apple
		this.apple = new Apple (
			this.rowQuantity,
			this.colQuantity,
			this.appleSetColor,
			this.appleUnsetColor
		);
		this.apple.create();
	}

	// Translates direction from key to snake
	changeSnakeDirection(arrowKeyDirection) {
		this.snake.direction = arrowKeyDirection;
	}
}

