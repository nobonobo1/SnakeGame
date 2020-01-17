
//
// Game class
//

function Game() {

	var self = this;

	// Initial matrix settings:
	this.matrixName = "matrix";
	this.rowQuantity = 20;
	this.colQuantity = 20;
	var cellType = {"empty":"empty", "snake":"snake", "apple":"apple"};

	// Initial snake settings:
	this.snakeRow = 1;
	this.snakeCol = 1;
	this.snakeDirection = "ArrowRight";
	this.timeInterval = 225;

	// Initial apple settings:
	this.appleRow = randomIntFromInterval(1, this.rowQuantity);
	this.appleCol = randomIntFromInterval(1, this.colQuantity);

	// Creating field, snake and apple
	this.create = function() {

		// Creating matrix by its settings
		self.matrix = new Matrix (
			self.matrixName, 
			self.rowQuantity, 
			self.colQuantity
		);
		self.matrix.create();

		// Creating snake by its settings
		self.snake = new Snake (
			self.snakeRow, 
			self.snakeCol,
			self.snakeDirection,
		);
		self.createSnake(self.snake.body.currentRow, self.snake.body.currentCol);

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

		// has class == "snake" => return "snake"
		// has class == "apple" => return "apple"
		// has class == "empty" => return "empty"
		if (cell.hasClass("snake")) {
			return "snake";
		}
		else if (cell.hasClass("apple")) {
			return "apple";
		}
		else if (cell.hasClass("empty")) {
			return "empty";
		}
	}

	// Fills and unfills cell with type chosen
	this.setCell = function(row, col, type) {

		// Selecting a cell from matrix
		var cellIndex = getCoord(row, col);
		var cell = $(self.matrix.matrixID).find("div").eq(cellIndex);

		// type == "snake" => set class "snake"
		// type == "empty" => set class "empty"
		// type == "apple" => set class "apple"
		switch (type) {
			case 'snake':
				cell.removeClass("apple");
				cell.removeClass("empty");
				cell.addClass("snake");
				break;
			case 'empty':
				cell.removeClass("apple");
				cell.removeClass("snake");
				cell.addClass("empty");
				break;
			case 'apple':
				cell.removeClass("empty");
				cell.addClass("apple");
				break;
		}
	}

	// Creating snake and setting moving interval
	this.createSnake = function(row, col) {
		self.setCell(row, col, cellType["snake"]);
		self.movingInterval = setInterval(
			() => {self.move()}, 
			self.timeInterval
		);
	}
	
	// Making snake move
	this.move = function() {

		// Unsetting previous position
		self.setCell(self.snake.body.currentRow, self.snake.body.currentCol, cellType["empty"]);

		// Reading direction
		switch (self.snake.direction) {
			case "ArrowUp":
				self.snake.body.currentRow--;
				break;
			case "ArrowDown":
				self.snake.body.currentRow++;
				break;
			case "ArrowLeft":
				self.snake.body.currentCol--;
				break;
			case "ArrowRight":
				self.snake.body.currentCol++;
				break;
		}

		// Snake getting upper and bottom borders => move continues 
		if (self.snake.body.currentRow < 1) {
			self.snake.body.currentRow = self.rowQuantity;
		} 
		else if (self.snake.body.currentRow > self.rowQuantity) {
			self.snake.body.currentRow = 1;
		}

		// Snake getting left and right borders => move continues
		if (self.snake.body.currentCol < 1) {
			self.snake.body.currentCol = self.colQuantity;
		} 
		else if (self.snake.body.currentCol > self.colQuantity) {
			self.snake.body.currentCol = 1;
		}

		// End? => stop moving, else set next cell
		if (self.getCell(self.snake.body.currentRow, self.snake.body.currentCol) == "apple") {
			clearInterval(self.movingInterval);
			alert("Game is over");
		}
		else {
			self.setCell(self.snake.body.currentRow, self.snake.body.currentCol, cellType["snake"]);
		}
	}

	// Apple position randomizer
	function randomIntFromInterval(min, max) {

		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// Creating new apple on field
	this.createApple = function(row, col) {

		// Set new apple if free space found
		while (self.getCell(row, col) != "empty") {
			row = randomIntFromInterval(1, self.rowQuantity);
			col = randomIntFromInterval(1, self.colQuantity);
		}
		self.setCell(row, col, cellType["apple"]);
	}

	// Translates direction from key to snake
	this.changeSnakeDirection = function(arrowKeyDirection) {
		self.snake.direction = arrowKeyDirection;
	}
}

