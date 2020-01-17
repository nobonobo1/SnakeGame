
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
	this.snakeHeadRow = 1;
	this.snakeHeadCol = 3;
	this.snakeDirection = "ArrowRight";	
	this.snakeLength = 3;
	this.timeInterval = 200;

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
			self.snakeHeadRow, 
			self.snakeHeadCol,
			self.snakeDirection,
			self.snakeLength
		);
		self.createSnake(self.snake.body[0].row, self.snake.body[0].col);

		// Creating apple
		self.apple = new Apple (
			self.appleRow,
			self.appleCol
		);
		self.createApple();
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
			
			// Adding bodypart to the end of snake
			self.setCell(self.snake.body[0].row, self.snake.body[0].col, cellType["snake"]);
			self.grow();
			// Creating new apple
			self.createApple();
		}
		else if (self.getCell(self.snake.body[0].row, self.snake.body[0].col) == "snake") {
			
			// Resetting snake
			self.reSetSnake();
		}
		else {

			// Common movement
			self.setCell(self.snake.body[0].row, self.snake.body[0].col, cellType["snake"]);
		}
	}

	// Growing the snake at the end
	this.grow = function() {
		var lastElem = self.snake.body[self.snake.body.length-1];
		self.snake.body.push(lastElem);
	}

	// Erasing the old snake and creating the new
	this.reSetSnake = function() {
		clearInterval(self.movingInterval);
		alert("Game is over!");
		for (i = 0; i < self.snake.body.length; i++) {
			self.setCell(self.snake.body[i].row, self.snake.body[i].col, cellType["empty"]);
		}
		self.snake = new Snake (
			self.snakeHeadRow, 
			self.snakeHeadCol,
			self.snakeDirection,
			self.snakeLength
		);
		self.createSnake(self.snake.body[0].row, self.snake.body[0].col);
	}

	// Apple position randomizer
	function randomIntFromInterval(min, max) {

		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// Creating new apple on field
	this.createApple = function() {
		self.apple.body.appleRow = randomIntFromInterval(1, self.rowQuantity);
		self.apple.body.appleCol = randomIntFromInterval(1, self.colQuantity);

		// Set new apple if free space found
		while (self.getCell(self.apple.body.appleRow, self.apple.body.appleCol) != "empty") {
			self.apple.body.appleRow = randomIntFromInterval(1, self.rowQuantity);
			self.apple.body.appleCol = randomIntFromInterval(1, self.colQuantity);
		}
		self.setCell(self.apple.body.appleRow, self.apple.body.appleCol, cellType["apple"]);
	}

	// Handling keydown
	document.onkeydown = function(event)
	{
		// Handling keydown if arrow keys are downed, else msg
		var arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
		if (arrows.includes(event.key)) {
			
			// Handling the key if not same direction, else msg
			if (self.snake.direction != event.key) {
				
				// Check if key is in opposite direction
				/*if	((((self.snake.direction == "ArrowRight") && (event.key == "ArrowLeft")) ||
					((self.snake.direction == "ArrowLeft") && (event.key == "ArrowRight")))	||
					(((self.snake.direction == "ArrowUp") && (event.key == "ArrowDown")) ||
					((self.snake.direction == "ArrowDown") && (event.key == "ArrowUp")))) {*/
					self.snake.direction = event.key;
					/*console.log("self.snake.direction: " + self.snake.direction);
					console.log("event.key: " + event.key);
				}
				else {
					console.log("Wrong direction!");
					console.log("Key pressed: " + event.key);
					console.log("self.snake.direction: " + self.snake.direction);
				}*/
			}
			else {
				console.log("Same Way!");
				/*console.log("self.snake.direction: " + self.snake.direction);
				console.log("event.key: " + event.key);*/
			}
		} 
		else
		{
			console.log("Wrong key: " + event.key);
		}
	}
}

$(document).ready(function() {
		
		// Creating game with field, snake and apple
		var game = new Game();
		game.create();
	}
);
