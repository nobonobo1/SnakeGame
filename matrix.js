
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

