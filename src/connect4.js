function diagonalUp(grid,a,b) {
    let diagonal = [grid[a][b]]
    for (let i = 1; i < 6-b; i++) {
        try {
            diagonal.push(grid[a+i][b+i])
        } catch (e) {
            break;
        }
    }
    return diagonal
}

function diagonalDown(grid,a,b) {
    let diagonal = [grid[a][b]]
    for (let i = 1; i < 6; i++) {
        try {
            diagonal.push(grid[a-i][b+i])
        } catch (e) {
            break
        }
    }
    return diagonal
}

function contains(l1, l2) {
	return !!~l2.join('').indexOf(l1.join(''))
}

function hasWon(grid,icon) {
    let draw = true;
    let connect4 = [icon,icon,icon,icon]
    let rows = []
    for (let i = 5; i > -1; i--) {
        let currentRow = []
        for (let row of grid) {
            currentRow.push(row[i])
            for (let item of row) {
                if (item === "~") {
                    draw = false;
                }
            }
        }
        if (draw) {
            return "DRAW"
        }

        rows.push(JSON.parse(JSON.stringify(currentRow)))
    }

    let diagonals = [
        diagonalUp(grid,0,2),
        diagonalUp(grid,0,1),
        diagonalUp(grid,0,0),
        diagonalUp(grid,1,0),
        diagonalUp(grid,2,0),
        diagonalUp(grid,3,0),
        diagonalDown(grid,6,2),
        diagonalDown(grid,6,1),
        diagonalDown(grid,6,0),
        diagonalDown(grid,5,0),
        diagonalDown(grid,4,0),
        diagonalDown(grid,3,0)
    ]

    for (let row of rows) {
        if (contains(connect4,row)) {
            return true
        }
    }
    for (let column of grid) {
        if (contains(connect4,column)) {
            return true
        }
    }
    for (let diagonal of diagonals) {
        if (contains(connect4,diagonal)) {
            return true
        }
    }
    return false
}

export default hasWon