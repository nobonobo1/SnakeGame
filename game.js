
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
	this.snakeCol = 3;
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
		self.createSnake(self.snake.body[0].row, self.snake.body[0].col);

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
		self.snake.body.forEach(
			snakePart => self.setCell(
				snakePart.row, 
				snakePart.col, 
				cellType["snake"]
			)
		);
		self.movingInterval = setInterval(
			() => {self.move()}, 
			self.timeInterval
		);
	}
	
	// Making snake move
	this.move = function() {

		// Unsetting last bodypart at field
		self.setCell(
			self.snake.body[self.snake.body.length-1].row, 
			self.snake.body[self.snake.body.length-1].col, 
			cellType["empty"]
		);

		// Deleting last bodypart
		self.snake.body.pop();
		
		// Adding head bodypart to first place
		if (self.snake.direction == "ArrowUp") {
			self.snake.body.unshift(
				{
					row: self.snake.body[0].row - 1,
					col: self.snake.body[0].col
				}
			);
		}
		else if (self.snake.direction == "ArrowDown") {
			self.snake.body.unshift(
				{
					row: self.snake.body[0].row + 1,
					col: self.snake.body[0].col
				}
			);
		}
		else if (self.snake.direction == "ArrowLeft") {
			self.snake.body.unshift(
				{
					row: self.snake.body[0].row,
					col: self.snake.body[0].col - 1
				}
			);
		}
		else if (self.snake.direction == "ArrowRight") {
			self.snake.body.unshift(
				{
					row: self.snake.body[0].row,
					col: self.snake.body[0].col + 1
				}
			);
		}
		else {
			//Pass
			console.log('Snake direction' + self.snake.direction);
			console.log('Previous snake direction' + snakePreviousDirection);
		}

		// Snake is getting upper and bottom borders => move continues 
		if (self.snake.body[0].row < 1) {
			self.snake.body[0].row = self.rowQuantity;
		} 
		else if (self.snake.body[0].row > self.rowQuantity) {
			self.snake.body[0].row = 1;
		}

		// Snake is getting left and right borders => move continues
		if (self.snake.body[0].col < 1) {
			self.snake.body[0].col = self.colQuantity;
		} 
		else if (self.snake.body[0].col > self.colQuantity) {
			self.snake.body[0].col = 1;
		}

		// End? => stop moving, else set next cell
		if (self.getCell(self.snake.body[0].row, self.snake.body[0].col) == "apple") {
			clearInterval(self.movingInterval);
			alert("Game is over");
		}
		else {
			self.setCell(self.snake.body[0].row, self.snake.body[0].col, cellType["snake"]);
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
		if (self.snake.direction != arrowKeyDirection) {
			self.snake.direction = arrowKeyDirection;
		}
		else {
			console.log('Same way');
		}
	}
}

