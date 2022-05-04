const posX = 0;
const posY = 0;
const width = 200;
const height = 200;
const dieSize = 50;
const radius = 7;
const _strokeWeight = 7;
const lowestRollPossible = 1;
const highestRollPossible = 7; // Add 1 to correct the random() weirdness
const die = new Map();

function setup() {
  button = createButton("Roll");
  button.position(
    posX + width / 2 - (posX + dieSize / 2),
    posY + height * 1.05
  );
  button.mousePressed(rollDice);

  createCanvas(width, height);

  die.set("one", 1);
  die.set("two", 2);
  die.set("three", 3);
  die.set("four", 4);
  die.set("five", 5);
  die.set("six", 6);
}

function draw() {
  background(220);
  drawDie();
}

function drawDie(diceRoll) {
  square(
    posX + (posX + width / 2) - (posX + dieSize / 2), // Set posX to  half the value of canvas width minus half the width of the die size.
    posY + (posY + height / 2) - (posY + dieSize / 2), // Does the same as above: for posY.
    dieSize,
    radius
  );
}

function rollDice() {
  result = Math.floor(
    Math.random() * (highestRollPossible - lowestRollPossible) +
      lowestRollPossible
  );
  console.log("The result was, " + result);
  drawDiceValues(result);
}

function drawDiceValues(diceRoll) {
  for (x in die) {
    if (x == diceRoll) {
      for (let dots = 0; dots <= x; dots++) {
        strokeWeight(_strokeWeight);
        point(
          posX + (posX + width / 2) - (posX + dieSize / 2),
          posY + (posY + height / 2) - (posY + dieSize / 2)
        );
        strokeWeight(1);
      }
    }
  }
  //map a 3x3 grid on to the square to place dots within, this will make aligning each dot very easy as we can turn off/on each sector of the grid as needed.
}
