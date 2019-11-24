
class Matrix {

	constructor(matrixName, rows, cols) {
		// Matrix settings
		this.matrixID = '#' + matrixName;
		this.rows = rows;
		this.cols = cols;
		console.log(this.matrixID);

	}
	
	// Creating matrix
	create() {
		var n = this.rows * this.cols;

		for (var i = 0; i < n; i++) {
			$("<div class='cell empty'></div>").appendTo($(this.matrixID));
		}
	}

	// Returns cell index in matrix array by given coordinates
	getCoord(row,col) {
		return ((row-1) * this.cols + (col-1))
	}	

	// Returns color of cell
	getCell(row, col) {

		// Selecting a cell from matrix
		var cell = $(this.matrixID).find("div").eq(this.getCoord(row, col));

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
	setCell(row, col, color) {

		// Selecting a cell from matrix
		// $(this.matrixID).css('backgroundColor: black');
		var cellIndex = this.getCoord(row, col)
		var cell = $("div > div").eq(cellIndex);
		// console.log(this.matrixID);
		// console.log($("div > div").eq(cellIndex).attr('class'));

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
}

