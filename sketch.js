const posX = 0;
const posY = 0;
const width = 200;
const height = 200;
const radius = 7;
const _strokeWeight = 7;
const lowestRollPossible = 1;
const highestRollPossible = 7; // Add 1 to correct the random() weirdness

const dice = {
  posX: 0, //(this.posX + width / 2) - (this.posX + this.dieSize / 2),
  posY: 0, //(this.posY + height / 2) - (this.posY + this.dieSize / 2),
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  dieSize: 50,
  cellSize: 0, //this.dieSize / 3
  gridX: 3,
  gridY: 3,
  isPressed: false,
};

function setup() {
  dice.posX = dice.posX + width / 2 - (dice.posX + dice.dieSize / 2);
  dice.posY = dice.posY + height / 2 - (dice.posY + dice.dieSize / 2);
  dice.cellSize = dice.dieSize / 3;

  button = createButton("Roll");
  button.position(button.size - width / 2, height * 1.05);
  button.mousePressed(rollDice);

  createCanvas(width, height);
  background(220);
}

function draw() {
  if (dice.isPressed) {
    drawDie();
    drawGrid();
  }
  dice.isPressed = false;
}

function drawDie() {
  square(
    posX + (posX + width / 2) - (posX + dice.dieSize / 2), // Set posX to half the value of canvas width, minus half the width of the die size.
    posY + (posY + height / 2) - (posY + dice.dieSize / 2), // Does the same as above: for posY.
    dice.dieSize,
    radius
  );
}

function drawGrid() {
  const matrix = new Array(5).fill(0).map(() => new Array(4).fill(0));
  console.log(matrix[0][0]);
  console.log(matrix[1][1]);

  console.log(matrix);
  
  for (row = 0; row < dice.gridX; row++) {
    for (column = 0; column < dice.gridY; column++) {
      /*strokeWeight(7);
      point(
        dice.posX + dice.dieSize / 2 - dice.dieSize / 3,
        dice.posY + dice.dieSize / 2 - dice.dieSize / 3,
        dice.cellSize / 3
      );

      strokeWeight(1);*/
      dice.posX += dice.cellSize;
    }
    dice.posX = dice.posX + width / 2 - (dice.posX + dice.dieSize / 2);
    dice.posY += dice.cellSize;
  }
}

function rollDice() {
  dice.isPressed = true;
  return Math.floor(
    Math.random() * (highestRollPossible - lowestRollPossible) +
      lowestRollPossible
  );
}
