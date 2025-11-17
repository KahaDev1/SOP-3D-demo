var vertices = [
  new Vertex(-1, -1, -1, "red"),
  new Vertex(1, -1, -1, "red"),
  new Vertex(1, 1, -1, "red"),
  new Vertex(-1, 1, -1, "red"),
  new Vertex(-1, -1, 1, "blue"),
  new Vertex(1, -1, 1, "blue"),
  new Vertex(1, 1, 1, "blue"),
  new Vertex(-1, 1, 1, "blue"),
];

var edges = [
  [0, 1],
  [0, 3],
  [0, 4],
  [2, 3],
  [2, 1],
  [2, 6],
  [6, 7],
  [6, 5],
  [1, 5],
  [7, 3],
  [5, 4],
  [4, 7],
];

const inputSize = 50;
const spacing = 80;
const startX = 450;
const startY = 20;

var inputs = [];
var custommatrix = [];

const fovYDeg = 45;
const fovYRad = degToRad(fovYDeg);
const canvasWidth = 800;
const canvasHeight = 800;
const aspect = canvasWidth / canvasHeight;

var angleY = 0;
var angleZ = 0;

const P = makePerspective(fovYRad, aspect);

let displayMessage = "Hello";
let pauseBtn;
var paused = true;

function setup() {
  createCanvas(400, 400);
  background(220);

  pauseBtn = createButton("Unpause");
  pauseBtn.position(450, 340);
  pauseBtn.mouseClicked(changePaused);

  for (let row = 0; row < 4; row++) {
    let rowArray = [];

    for (let col = 0; col < 4; col++) {
      var newInput = createInput(0);

      if (col == row) {
        newInput.value(1);
      }

      newInput.size(inputSize, inputSize);
      newInput.changed(valueChanged);

      let x = startX + col * spacing;
      let y = startY + row * spacing;

      newInput.position(x, y);

      rowArray.push(newInput);
    }
    inputs.push(rowArray);
  }
  valueChanged();
}

function draw() {
  background(230);
  if (!paused) {
    angleY += 0.06;
  }
  const Ry = makeRotationY(sin(angleY * 0.02) * 160);
  const S = makeScale(0.2, 0.2, 0.2);
  const V = makeTranslate([0, 0, 1]);

  const R2 = multiplyMatrices(Ry, custommatrix);
  const L = multiplyMatrices(R2, S);
  const MV = multiplyMatrices(V, L);
  const MVP = multiplyMatrices(P, MV);

  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];

    const v1 = [element.x, element.y, element.z, element.w];

    const v2 = multiplyMatrixVector(MVP, v1);

    const ndcX = v2[0] / abs(v2[3]);
    const ndcY = v2[1] / abs(v2[3]);

    const screenX = (ndcX * 0.5 + 0.5) * width;
    const screenY = (-ndcY * 0.5 + 0.5) * height;

    vertices[i].screenX = screenX;
    vertices[i].screenY = screenY;
    if (v2[3] > 0) {
      drawVertex(screenX, screenY, v2[3]);
    }
  }
  drawEdges();
}

function drawVertex(x, y, z) {
  const a = { r: 255, g: 0, b: 0 };
  const b = { r: 0, g: 0, b: 255 };
  const t = mapRange(z, 0.8, 1.3, 0, 1);
  const mix = mixColor(a, b, t);
  fill(mix.r, mix.g, mix.b);
  noStroke();
  circle(x, y, 8);
}

function valueChanged() {
  custommatrix = [];
  for (let row = 0; row < 4; row++) {
    let rowArray = [];
    for (let col = 0; col < 4; col++) {
      const matrixInput = inputs[row][col].value();
      if (isNaN(matrixInput)) {
        return;
      }
      rowArray.push(matrixInput);
    }
    custommatrix.push(rowArray);
  }
}

function drawEdges() {
  for (let i = 0; i < edges.length; i++) {
    const element = edges[i];
    const pointAx = vertices[element[0]].screenX;
    const pointAy = vertices[element[0]].screenY;
    const pointBx = vertices[element[1]].screenX;
    const pointBy = vertices[element[1]].screenY;
    stroke(0);
    strokeWeight(3);
    line(pointAx, pointAy, pointBx, pointBy);
  }
}

function changePaused() {
  if (!paused) {
    buttonLabel = "Unpause";
    pauseBtn.html(buttonLabel);
  } else {
    buttonLabel = "Pause";
    pauseBtn.html(buttonLabel);
  }
  paused = !paused;
}
