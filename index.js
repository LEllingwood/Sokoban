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
            movePlayerToCellElement(cellElement)
            // if (cellElement.dataset.type === "finish") {
            //     alert("You Win") *can't use console.log or alert to indicate a win
            // }
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
            break
        case "S":
            cellElement.dataset.type = "start"
            break
        case "B":
            cellElement.dataset.type = "box"
            break
        case "O":
            cellElement.dataset.type = "boxDestination"
            break
    }
    cellElement.classList.add(cellElement.dataset.type, "cell")
    cellElement.dataset.rowIndex = rowIndex;
    cellElement.dataset.cellIndex = cellIndex;
    return cellElement
}
// switch case is basically a big if else statement

function movePlayerToCellElement(cellElement) {
    cellElement.appendChild(playerElement)
}


function findCellByCoordinates(rowIndex, cellIndex) {
    const rowIndexSelector = "[data-row-index='" + rowIndex + "']"
    const cellIndexSelector = "[data-cell-index='" + cellIndex + "']"
    const cellSelector = "#gameboard .row " + rowIndexSelector + cellIndexSelector
    return document.querySelector(cellSelector)
    // this function will search the DOM for a cell that meets both the row and cell types
    // findCellByCoordinates(rowIndex, cellIndex + 1)-this is how you would check the cell to the right
}

// event handler for moving keys based on arrow press:
document.addEventListener('keydown', (event) => {
    let keyName = event.key;
    let rowIndex = playerPosition.row
    let cellIndex = playerPosition.column
    if (keyName === "ArrowDown") {
        let newCellNode = findCellByCoordinates(rowIndex + 1, cellIndex)
        if (newCellNode.dataset.type !== "wall"){
            movePlayerToCellElement(newCellNode)
            playerPosition.row += 1
        }
    }
    if (keyName === "ArrowUp") {
        let newCellNode = findCellByCoordinates(rowIndex - 1, cellIndex)
        if (newCellNode.dataset.type !== "wall"){
            movePlayerToCellElement(newCellNode)
            playerPosition.row -= 1
        }
    }
    if (keyName === "ArrowLeft") {
        let newCellNode = findCellByCoordinates(rowIndex, cellIndex - 1)
           if (newCellNode.dataset.type !== "wall"){
            movePlayerToCellElement(newCellNode)
            playerPosition.column -= 1
        }
    }

    if (keyName === "ArrowRight") {
        let newCellNode = findCellByCoordinates(rowIndex, cellIndex + 1)
        if (newCellNode.dataset.type !== "wall") { 
             movePlayerToCellElement(newCellNode)
             playerPosition.column += 1
            }
        }
    }
)


// function addWinMessage() {
//         const message = document.createTextNode("You win!");
//         const newP = document.createElement("p");
//         const destination = document.getElementById("winMessage");
//         newP.appendChild(message);
//         destination.appendChild(newP);
//     }