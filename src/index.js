module.exports = function solveSudoku(matrix) {
  let valueLimit = 9;
  let zeroPositions = findAllZeroPosition(matrix);

  for(let i = 0; i < zeroPositions.length;) {
    let row = zeroPositions[i][0];
    let column = zeroPositions[i][1];
    let insert = false;
    let value = matrix[row][column] + 1; // next value in this cell

    for(; !insert && value <= valueLimit; value++) {
      if(checkValue(matrix, row, column, value)) {
        matrix[row][column] = value;
        insert = true;
        i++;
      }
    }  

    if(!insert) { // go back, because previous value is wrong
      matrix[row][column] = 0;
      i--;
    }
  }

  return matrix;
};

function findAllZeroPosition(matrix) {
  let zeroPositions = [];
    
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === 0) {
        zeroPositions.push([i, j]);
      }
    }
  }

  return zeroPositions;
}

function checkRow(matrix, row, value) {
  for(let i = 0; i < matrix[row].length; i++) {
    if(matrix[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(matrix, column, value) {
  for(let i = 0; i < matrix.length; i++) {
    if(matrix[i][column] === value) {
      return false;
    }
  }

  return true;
}

function checkSquare(matrix, row, column, value) {
  let columnCheck = 0;
  let rowCheck = 0;
  let squareSize = 3;

  while(row >= rowCheck + squareSize) {
    rowCheck += squareSize;
  }

  while(column >= columnCheck + squareSize) {
    columnCheck += squareSize;
  }

  for(let i = rowCheck; i < rowCheck + squareSize; i++) {
    for(let j = columnCheck; j < columnCheck + squareSize; j++) {
      if(matrix[i][j] === value) {
        return false;
      }
    }
  }

  return true;
}

function checkValue(matrix, row, column, value) {
  if(!(checkRow(matrix, row, value) &&
        checkColumn(matrix, column, value) &&
          checkSquare(matrix, row, column, value))) {
    return false;
  } 

  return true;
}