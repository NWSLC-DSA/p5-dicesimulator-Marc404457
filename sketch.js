const width = 200;
const height = 200;
const radius = 7;
const _strokeWeight = 7;
const lowestRollPossible = 1;
const highestRollPossible = 7; // Add 1 to correct the random() weirdness

const dice = {
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  size: 50,
  isPressed: false,
};

const player = {
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  won: 0,
  lost: 0,
  draw: 0,
};

const computer = {
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  won: 0,
  lost: 0,
  draw: 0,
};

function setup() {
  player.posX = width / 2 - dice.size * 0.25;
  player.posY = height / 2;
  computer.posX = width / 2 + dice.size * 1.25;
  computer.posY = height / 2;
  button = createButton("Roll");
  button.size(100);
  button.position(width / 2 - 50, height * 1.05);
  button.mousePressed(buttonPressed);

  createCanvas(width, height);
  background(220);
}

function draw() {
  if (dice.isPressed) {
    drawDie(player);
    drawDie(computer);
    drawFace(player.roll, player);
    drawFace(computer.roll, computer);
    console.log("Click...");
  }
  dice.isPressed = false;
}

function buttonPressed() {
  dice.isPressed = true;
  player.roll = rollDice();
  computer.roll = rollDice();

  console.log(`You rolled a...\n${player.roll}`);
  console.log(`The computer rolled a...\n${computer.roll}`);
}

function drawDie(owner) {
  if (owner.roll > 0) {
    square(
      owner.posX - dice.size,
      owner.posY - dice.size / 2,
      dice.size,
      radius
    );
  } else {
    console.log(`Could not draw ${owner} dice`);
  }
}

function drawFace(rollValue, owner) {
  faces = [
    [owner.posX, owner.posY], // Middle, index 0
    [owner.posX - dice.size * 0.25, owner.posY + dice.size * 0.25], // Bottom Left, index 1
    [owner.posX - dice.size * 0.25, owner.posY - dice.size * 0.25], // Top Left, index 2
    [owner.posX + dice.size * 0.25, owner.posY + dice.size * 0.25], // Bottom Right, index 3
    [owner.posX + dice.size * 0.25, owner.posY - dice.size * 0.25], // Top Right, index 4
    [owner.posX - dice.size * 0.25, owner.posY], // Middle Left, index 5
    [owner.posX + dice.size * 0.25, owner.posY], // Middle Right, index 6
  ];

  strokeWeight(_strokeWeight);
  if (rollValue == 1) {
    point(faces[0][0], faces[0][1]);
  } else if (rollValue == 2) {
    point(faces[1][0], faces[1][1]);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 3) {
    point(faces[0][0], faces[0][1]);
    point(faces[1][0], faces[1][1]);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 4) {
    point(faces[1][0], faces[1][1]);
    point(faces[2][0], faces[2][1]);
    point(faces[3][0], faces[3][1]);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 5) {
    point(faces[0][0], faces[0][1]);
    point(faces[1][0], faces[1][1]);
    point(faces[2][0], faces[2][1]);
    point(faces[3][0], faces[3][1]);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 6) {
    point(faces[1][0], faces[1][1]);
    point(faces[2][0], faces[2][1]);
    point(faces[3][0], faces[3][1]);
    point(faces[4][0], faces[4][1]);
    point(faces[5][0], faces[5][1]);
    point(faces[6][0], faces[6][1]);
  } else {
    console.log("ICH BIN KAPUT!!");
  }
  strokeWeight(1);
}

function rollDice() {
  return Math.floor(
    Math.random() * (highestRollPossible - lowestRollPossible) +
      lowestRollPossible
  );
}
