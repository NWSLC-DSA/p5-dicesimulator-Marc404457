const width = 200;
const height = 200;
const radius = 7;
const _strokeWeight = 7;
const lowestRollPossible = 1;
const highestRollPossible = 7; // Add 1 to correct the random() weirdness

const dice = {
  name: "Dice",
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  size: 50,
  isPressed: false,
};

const player = {
  name: "Fundo",
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  won: 0,
  lost: 0,
  draw: 0,
};

const computer = {
  name: "Computer",
  center: 0,
  posX: 0,
  posY: 0,
  roll: 0,
  won: 0,
  lost: 0,
  draw: 0,
};

function setup() {
  player.name = player.posX = width / 2 - dice.size * 0.25;
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
    //console.log("clicked");
  }
  dice.isPressed = false;
}

function buttonPressed() {
  dice.isPressed = true;
  player.roll = rollDice();
  computer.roll = rollDice();

  let winner = whoWon(player.roll, computer.roll);

  console.log(`
    You rolled a, ${player.roll}
    The computer rolled a, ${computer.roll}

    The winner is ${winner}`);
}

function drawDie(owner) {
  stroke("black");
  strokeWeight(1);
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
    [owner.posX - dice.size / 2, owner.posY], // Middle, index 0 RED
    [owner.posX - dice.size * 0.75, owner.posY + dice.size * 0.25], // Bottom Left, index 1 GREEN
    [owner.posX - dice.size * 0.75, owner.posY - dice.size * 0.25], // Top Left, index 2 YELLOW
    [owner.posX - dice.size * 0.25, owner.posY + dice.size * 0.25], // Bottom Right, index 3 ORANGE
    [owner.posX - dice.size * 0.25, owner.posY - dice.size * 0.25], // Top Right, index 4 PURPLE
    [owner.posX - dice.size * 0.75, owner.posY], // Middle Left, index 5 BLUE
    [owner.posX - dice.size * 0.25, owner.posY], // Middle Right, index 6 PINK
  ];

  //console.log(`${owner.name} posX is ${owner.posX}, posY is ${owner.posY}\n`);
  let randomStroke = Math.floor(Math.random() * 16777215).toString(16);
  //console.log(`${owner.name}'s colour is ${randomStroke}`);

  let rgb = parseInt(randomStroke, 16); // convert rrggbb to decimal
  let redScale = (rgb >> 16) & 0xff; // extract red
  let greenScale = (rgb >> 8) & 0xff; // extract green
  let blueScale = (rgb >> 0) & 0xff; // extract blue

  let luma = 0.2126 * redScale + 0.7152 * greenScale + 0.0722 * blueScale;

  //console.log(`Luma = ${redScale} ${greenScale} ${blueScale} = ${luma}`);
  if (luma < 100 || luma > 200) {
    stroke(`#${randomStroke}`);
    //console.log(`Changed ${owner.name} colour to ${randomStroke}`);
  }

  strokeWeight(_strokeWeight);
  if (rollValue == 1) {
    //stroke(`red`);
    point(faces[0][0], faces[0][1]);
  } else if (rollValue == 2) {
    //stroke(`green`);
    point(faces[1][0], faces[1][1]);
    //stroke(`purple`);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 3) {
    //stroke(`red`);
    point(faces[0][0], faces[0][1]);
    //stroke(`green`);
    point(faces[1][0], faces[1][1]);
    //stroke(`purple`);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 4) {
    //stroke(`green`);
    point(faces[1][0], faces[1][1]);
    //stroke(`yellow`);
    point(faces[2][0], faces[2][1]);
    //stroke(`orange`);
    point(faces[3][0], faces[3][1]);
    //stroke(`purple`);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 5) {
    //stroke(`red`);
    point(faces[0][0], faces[0][1]);
    //stroke(`green`);
    point(faces[1][0], faces[1][1]);
    //stroke(`yellow`);
    point(faces[2][0], faces[2][1]);
    //stroke(`orange`);
    point(faces[3][0], faces[3][1]);
    //stroke(`purple`);
    point(faces[4][0], faces[4][1]);
  } else if (rollValue == 6) {
    //stroke(`green`);
    point(faces[1][0], faces[1][1]);
    //stroke(`yellow`);
    point(faces[2][0], faces[2][1]);
    //stroke(`orange`);
    point(faces[3][0], faces[3][1]);
    //stroke(`purple`);
    point(faces[4][0], faces[4][1]);
    //stroke(`blue`);
    point(faces[5][0], faces[5][1]);
    //stroke(`pink`);
    point(faces[6][0], faces[6][1]);
  } else {
    console.log("ICH BIN KAPUT!!");
  }
  strokeWeight(1);
}

function whoWon(playerRoll, computerRoll) {
  if (playerRoll > computerRoll) {
    player.won += 1;
    computer.lost += 1;
    return player.name;
  } else if (playerRoll < computerRoll) {
    computer.won += 1;
    player.lost += 1;
    return computer.name;
  } else {
    player.draw += 1;
    computer.draw += 1;
    return "no one";
  }
}

function rollDice() {
  return Math.floor(
    Math.random() * (highestRollPossible - lowestRollPossible) +
      lowestRollPossible
  );
}
