
function Game() {

	var self = this;

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
	this.appleRow = randomIntFromInterval(1, this.rowQuantity);
	this.appleCol = randomIntFromInterval(1, this.colQuantity);
	this.appleSetColor = 'red';
	this.appleUnsetColor = 'clearRed';

	// Creating field, snake and apple
	this.create = function() {

		// Creating matrix by its settings
		self.matrix = new Matrix (
			self.matrixName, 
			self.rowQuantity, 
			self.colQuantity
		);
		self.matrix.create();

/*		// Creating snake by its settings
		self.snake = new Snake (
			self.snakeRow, 
			self.snakeCol,
			self.snakeSetColor,
			self.snakeUnsetColor,
			self.snakeDirection,
			self.movingInterval
		);
		self.snake.create();*/

		// Creating apple
		self.apple = new Apple (
			self.appleRow,
			self.appleCol
		);
		self.createApple(self.apple.body.appleRow, self.apple.body.appleCol);
	}
	

	// Returns cell index in matrix array by given coordinates
	function getCoord(row, col) {

		return ((row-1) * self.colQuantity + (col-1))
	}

	// Returns color of cell
	this.getCell = function(row, col) {

		// Selecting a cell from matrix
		var cellIndex = getCoord(row, col);
		var cell = $(self.matrix.matrixID).find("div").eq(cellIndex);

		// has class == 'snake' => return 'green'
		// has class == 'apple' => return 'red'
		// has class == 'empty' => return 'empty'
		if (cell.hasClass('snake')) {
			return 'green';
		}
		else if (cell.hasClass('apple')) {
			return 'red';
		}
		else if (cell.hasClass('empty')) {
			return 'empty';
		}
	}

	// Fills and unfills cell with color chosen
	this.setCell = function(row, col, color) {

		// Selecting a cell from matrix
		var cellIndex = getCoord(row, col);
		var cell = $(self.matrix.matrixID).find("div").eq(cellIndex);

		// color == 'red' => set class 'apple'
		// color == 'clearRed' => remove class 'apple'
		// color == 'green' => set class 'snake'
		// color == 'clearGreen' => remove class 'snake'
		switch (color) {
			case 'red':
				cell.removeClass('empty');
				cell.addClass('apple');
				break;
			case 'clearRed':
				cell.removeClass('apple');
				cell.addClass('snake');
				break;
			case 'green':
				cell.removeClass('empty');
				cell.addClass('snake');
				break;
			case 'clearGreen':
				cell.removeClass('snake');
				cell.addClass('empty');
				break;
		}
	}
	
	// Apple position randomizer
	function randomIntFromInterval(min, max) {

		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// Creating new apple on field
	this.createApple = function(row, col) {

		// Set new apple if free space found
		while (self.getCell(row, col) != 'empty') {
			row = randomIntFromInterval(1, self.rowQuantity);
			col = randomIntFromInterval(1, self.colQuantity);
		}
		self.setCell(row, col, self.appleSetColor);
	}

	// Translates direction from key to snake
/*	changeSnakeDirection(arrowKeyDirection) {
		this.snake.direction = arrowKeyDirection;
	}*/
}

