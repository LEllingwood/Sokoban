const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

const gameboard = document.getElementById("gameboard");
const playerElement = createPlayer();
const playerPosition = {
    row: 2,
    column: 2,
}

for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const rowString = map[rowIndex];
    const rowDiv = createRow();
    gameboard.appendChild(rowDiv);

    for (let cellIndex = 0; cellIndex < rowString.length; cellIndex++) {
        const cellCharacter = rowString[cellIndex];
        let cellElement = createCellElement(cellCharacter, rowIndex, cellIndex)

        if (cellElement.dataset.type === "start") {
            moveToward(cellElement)
        }
        rowDiv.appendChild(cellElement)
    }
}

function createRow() {
    const rowDiv = document.createElement("div")
    rowDiv.classList.add("row")
    return rowDiv
}

function createPlayer() {
    const playerDiv = document.createElement("div")
    playerDiv.classList.add("player", "cell")
    return playerDiv

}

function createCellElement(cellCharacter, rowIndex, cellIndex) {
    const cellElement = document.createElement("div")
    switch (cellCharacter) {
        case "W":
            cellElement.dataset.type = "wall"
            break
        case " ":
            cellElement.dataset.type = "hall"
            cellElement.dataset.hallType = "normal"
            break
        case "S":
            cellElement.dataset.type = "hall"
            cellElement.dataset.hallType = "start"
            cellElement.classList.add("start")
            break
        case "B":
            cellElement.dataset.type = "hall"
            cellElement.dataset.hallType = "normal"
            !cellElement.classList.add("box")
            break
        case "O":
            cellElement.dataset.type = "hall"
            cellElement.dataset.hallType = "destination"
            cellElement.classList.add("boxDestination");
            break
        case "X":
            cellElement.dataset.type = "hall"
            cellElement.dataset.hallType = "destination"
            !cellElement.classList.add("box")
            break
    }
    // fiddle with the formatting to separate items and need to make "box" class more important than "cell" class
    cellElement.classList.add(cellElement.dataset.type, "cell")
    cellElement.dataset.rowIndex = rowIndex;
    cellElement.dataset.cellIndex = cellIndex;
    return cellElement
}
// switch case is basically a big if else statement

function moveToward(nextCellElement, keyName) {
     // if (nextCellElement +1.dataset.type === "hall")
        nextCellElement.appendChild(playerElement) 
    }
// function nextCellPlusOne(nextCellElement, rowIndex, cellIndex){
    // let checkTheNextTwoCells = nextCellElement + 1
    // if (checkTheNextTwoCells
    // }

    // write function looking at one cell beyond nextCellElement (in a)
    // if (nextCellElement.classList.contains("box")){  
        // check via type to see if it's a wall.  maybe move this up one line (if statment)
// somewhere we will check the cell to see if it's a wall or a box. remove box class from one cell element only when the next two boxes are halls (and adding it to the one after).
// }

function findCellByCoordinates(rowIndex, cellIndex) {
    const rowIndexSelector = "[data-row-index='" + rowIndex + "']"
    const cellIndexSelector = "[data-cell-index='" + cellIndex + "']"
    const cellSelector = "#gameboard .row " + rowIndexSelector + cellIndexSelector
    return document.querySelector(cellSelector)
    // this function will search the DOM for a cell that meets both the row and cell types
}

// event handler for moving keys based on arrow press:
document.addEventListener('keydown', (event) => {
    let keyName = event.key;
    let rowIndex = playerPosition.row
    let cellIndex = playerPosition.column
    if (keyName === "ArrowDown") {
        let newCellNode = findCellByCoordinates(rowIndex + 1, cellIndex)
        // let newBoxNode = findCellByCoordinates(rowIndex + 2, cell Index)
        if (newCellNode.dataset.type !== "wall") {
            moveToward(newCellNode, keyName)
            playerPosition.row += 1
        }
    }

    if (keyName === "ArrowUp") {
        let newCellNode = findCellByCoordinates(rowIndex - 1, cellIndex)
        if (newCellNode.dataset.type !== "wall") {
            moveToward(newCellNode, keyName)
            playerPosition.row -= 1
        }
    }
    if (keyName === "ArrowLeft") {
        let newCellNode = findCellByCoordinates(rowIndex, cellIndex - 1)
        if (newCellNode.dataset.type !== "wall") {
            moveToward(newCellNode, keyName)
            playerPosition.column -= 1
        }
    }

    if (keyName === "ArrowRight") {
        let newCellNode = findCellByCoordinates(rowIndex, cellIndex + 1)
        if (newCellNode.dataset.type !== "wall") {
            moveToward(newCellNode, keyName)
            playerPosition.column += 1
        }
    }

    // if () the boxes are in the right place, call the addWinMessage function
})

function addWinMessage() {
        const message = document.createTextNode("You win!");
        const newP = document.createElement("p");
        const destination = document.getElementById("winMessage");
        newP.appendChild(message);
        destination.appendChild(newP);
    }