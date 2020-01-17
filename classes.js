
// 
// Matrix class
//

function Matrix(matrixName, rows, cols) {

	var self = this;

	// Matrix settings
	this.matrixID = '#' + matrixName;
	this.rows = rows;
	this.cols = cols;
	
	// Creating matrix
	this.create = function() {
		var n = self.rows * self.cols;

		for (var i = 0; i < n; i++) {
			$("<div class='cell empty'></div>").appendTo($(self.matrixID));
		}
	}
}

// 
// Snake class
//

function Snake(bodyRow, bodyCol, direction, length) {

	this.body = [];
	// Snake settings:
	for (i = 0; i < length; i++) {
		this.body.push({row: bodyRow, col: bodyCol - i});
	}
	/*this.body = [
		{row: bodyRow, col: bodyCol},
		{row: bodyRow, col: bodyCol-1},
		{row: bodyRow, col: bodyCol-2}
	];*/
	this.direction = direction;
}

// 
// Apple class
//

function Apple(row, col) {

	// Apple settings:
	this.body = {appleRow: row, appleCol: col}
}

