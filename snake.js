
class Snake {

	constructor(row, col, setColor, unsetColor, direction, interval) {
		// Snake settings:
		this.body = {currentRow: row, currentCol: col};
		this.setColor = setColor;
		this.unsetColor = unsetColor;
		this.direction = direction;
		this.interval = interval;
	}

	// Creating snake
	create() {
		super.setCell(this.body.currentRow, this.body.currentCol, this.setColor);
		this.movingInterval = setInterval(() => {this.move()}, this.interval);
		// console.log(typeof this.move());
	}
	
	// Making snake move
	move() {

		// Unsetting previous position
		super.setCell(this.body.currentRow, this.body.currentCol, this.unsetColor);

		// Reading direction
		switch (this.direction) {
			case 'ArrowUp':
				this.body.currentRow--;
				break;
			case 'ArrowDown':
				this.body.currentRow++;
				break;
			case 'ArrowLeft':
				this.body.currentCol--;
				break;
			case 'ArrowRight':
				this.body.currentCol++;
				break;
		}

		// Snake getting upper and bottom borders => move continues 
		if (this.body.currentRow < 1) {
			this.body.currentRow = super.rows;
		} 
		else if (this.body.currentRow > super.rows) {
			this.body.currentRow = 1;
		}

		// Snake getting left and right borders => move continues
		if (this.body.currentCol < 1) {
			this.body.currentCol = super.cols;
		} 
		else if (this.body.currentCol > super.cols) {
			this.body.currentCol = 1;
		}

		// End? => stop moving, else set next cell
		if (super.getCell(this.body.currentRow, this.body.currentCol)) {
			clearInterval(this.movingInterval);
			alert('Game is over');
		}
		else {
			super.setCell(this.body.currentRow, this.body.currentCol, this.setColor);
		}
	}
}

