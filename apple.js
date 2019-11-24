
class Apple {
	
	constructor(rows, cols, setColor, unsetColor) {

		// Apple settings:
		this.body = {
			appleRow: this.randomIntFromInterval(1, rows), 
			appleCol: this.randomIntFromInterval(1, cols)
		}
		this.setColor = setColor;
		this.unsetColor = unsetColor;
	}

	// Apple position randomizer
	randomIntFromInterval(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// Creating apple
	create() {
		super.setCell(this.body.appleRow, this.body.appleCol, this.setColor);
	}

	// Recreating apple
	reCreate() {
		while (super.getCell(this.body.appleRow, this.body.appleCol)) {
			this.body.appleRow = randomIntFromInterval(1, rows);
			this.body.appleCol = randomIntFromInterval(1, cols);
		}
		super.setCell(this.body.appleRow, this.body.appleCol, this.setColor);
	}
}

