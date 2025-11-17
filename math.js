function multiplyMatrices(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  const result = new Array(rowsA);

  for (let i = 0; i < rowsA; i++) {
    result[i] = new Array(colsB).fill(0);
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}

function multiplyMatrixVector(M, v) {
  const rows = M.length;
  const cols = M[0].length;

  const result = new Array(rows);

  for (let i = 0; i < rows; i++) {
    let sum = 0;
    for (let j = 0; j < cols; j++) {
      sum += M[i][j] * v[j];
    }
    result[i] = sum;
  }

  return result;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function makeRotationY(deg) {
  const rad = degToRad(deg);
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  return [
    [c, 0, s, 0],
    [0, 1, 0, 0],
    [-s, 0, c, 0],
    [0, 0, 0, 1],
  ];
}

function makeRotationZ(deg) {
  const rad = degToRad(deg);
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  return [
    [c, -s, 0, 0],
    [s, c, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
}

function makeRotationX(deg) {
  const rad = degToRad(deg);
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  return [
    [1, 0, 0, 0],
    [0, c, -s, 0],
    [0, s, c, 0],
    [0, 0, 0, 1],
  ];
}

function makeScale(sx, sy, sz) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1],
  ];
}

function makeTranslate(translation) {
  return [
    [1, 0, 0, translation[0]],
    [0, 1, 0, translation[1]],
    [0, 0, 1, translation[2]],
    [0, 0, 0, 1],
  ];
}

function makePerspective(fovY, aspect) {
  const f = 1 / Math.tan(fovY / 2);

  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
}

function mixColor(c1, c2, t) {
  if (t < 0) t = 0;
  if (t > 1) t = 1;

  const r = c1.r + (c2.r - c1.r) * t;
  const g = c1.g + (c2.g - c1.g) * t;
  const b = c1.b + (c2.b - c1.b) * t;

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}
