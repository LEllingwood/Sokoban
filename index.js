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
let playerPosition = {
    row: 0,
    column: 0,
}

for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const rowString = map[rowIndex];
    const rowDiv = createRow();
    gameboard.appendChild(rowDiv);

    for (let cellIndex = 0; cellIndex < rowString.length; cellIndex++) {
        const cellCharacter = rowString[cellIndex];
        let cellElement = createCellElement(cellCharacter, rowIndex, cellIndex)

        if (cellElement.dataset.type === "start") {
            movePlayerToward(cellElement)
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
            cellElement.classList.add("wall")
            break
        case " ":
            cellElement.dataset.type = "hall"
            cellElement.classList.add("hall")
            break
        case "S":
            cellElement.dataset.type = "hall"
            cellElement.classList.add("start")
            playerPosition.row = rowIndex
            playerPosition.column = cellIndex
            console.log(playerPosition)
            cellElement.appendChild(playerElement)
            break
        case "B":
            cellElement.dataset.type = "hall"
            cellElement.classList.add("box")
            break
        case "O":
            cellElement.dataset.type = "hall"
            cellElement.classList.add("boxDestination");
            break
        case "X":
            cellElement.dataset.type = "hall"
            cellElement.classList.add("box", "boxDestination")
            break
    }
    cellElement.classList.add(cellElement.dataset.type, "cell")
    cellElement.dataset.rowIndex = rowIndex;
    cellElement.dataset.cellIndex = cellIndex;
    return cellElement
}
// switch case is basically a big if else statement
function movePlayerToward(nextCellElement, keyName) {
    nextCellElement.appendChild(playerElement)
}

function findCellByCoordinates(rowIndex, cellIndex) {
    const rowIndexSelector = "[data-row-index='" + rowIndex + "']"
    const cellIndexSelector = "[data-cell-index='" + cellIndex + "']"
    const cellSelector = "#gameboard .row " + rowIndexSelector + cellIndexSelector
    return document.querySelector(cellSelector)
}

function isWall(cell) {
    return cell.dataset.type === "wall"
}

function hasBox(cell) {
    return cell.classList.contains("box")
}

function findOffset(keyName) {
    const offset = {
        "ArrowDown": { row: +1, column: +0 },
        "ArrowUp": { row: -1, column: +0 },
        "ArrowLeft": { row: +0, column: -1 },
        "ArrowRight": { row: +0, column: +1 },
    }
    return [offset[keyName].row, offset[keyName].column]
}

function attemptMove(rowIndex, cellIndex, keyName) {
    const [rowOffset, columnOffset] = findOffset(keyName)
    // array destructuring: javascript.info article is interesting.  check out mdn, too.  takes array you're getting from findOffset and says it wants the first element out of the rowOffset array and the second element out of the columnOffset.
    const playerTargetCell = findCellByCoordinates(rowIndex + rowOffset, cellIndex + columnOffset)
    const nextRowOffset = rowOffset === 0 ? 0 : rowOffset + rowOffset
    const nextColumnOffset = columnOffset == 0 ? 0 : columnOffset + columnOffset
    const boxTargetCell = findCellByCoordinates(rowIndex + nextRowOffset, cellIndex + nextColumnOffset)
    if (isWall(playerTargetCell)) return false
    if (hasBox(playerTargetCell) && (hasBox(boxTargetCell) || isWall(boxTargetCell))) return false

    movePlayerToward(playerTargetCell, keyName)
    playerPosition.row += rowOffset
    playerPosition.column += columnOffset

    if (hasBox(playerTargetCell)) {
        console.log(boxTargetCell)
        boxTargetCell.classList.add("box")
    }
    playerTargetCell.classList.remove("box")

    checkWin()
}
document.addEventListener('keydown', (event) => {
    let keyName = event.key;
    let rowIndex = playerPosition.row
    let cellIndex = playerPosition.column

    attemptMove(rowIndex, cellIndex, keyName)
    // if () the boxes are in the right place, call the addWinMessage function

})

function checkWin() {
    // queryselector for all elements with box destination as a class; then use queryselector again to get all elements that have both box destination and the box class.  if the no of both is the same, you win.
    let allBoxDestinations = document.querySelectorAll(".boxDestination")
    let allBoxandBoxDestinations = document.querySelectorAll(".boxDestination.box")
    if (allBoxDestinations.length === allBoxandBoxDestinations.length) {
        addWinMessage()
    }
}

function addWinMessage() {
    const message = document.createTextNode("WHATEVER, CARL!!");
    const newP = document.createElement("p");
    const destination = document.getElementById("winMessage");
    newP.appendChild(message);
    destination.appendChild(newP);
}

function initView() {
    createCellElement()
    document.getElementById("refresh").addEventListener("click", function () {
        window.top.location.reload();
    })
}
initView()