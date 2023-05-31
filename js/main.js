var canvasGood, canvasGoodObj;
var scaleImage = { x: 0, y: 0 };
var afternoonImgGoodObj;
var afternoonImgBadObj;

var imgMorningGood = new Image();
imgMorningGood.src = CONST.MORNING_GOOD_IMG;

var imgAfternoonGood = new Image();
imgAfternoonGood.src = CONST.AFTERNOON_GOOD_IMG;

/* Initiate a canvas instance. */
// function initCanvas() {
//   canvasGoodObj = new fabric.Canvas(canvasGood);
//   canvasGoodObj.setWidth(CONST.CANVAS_STYLE_WIDTH);
//   canvasGoodObj.setHeight(CONST.CANVAS_STYLE_HEIGHT);
// }

// function initImageObj() {
//   afternoonImgGoodObj = imageUtil.handleInitImgObj(afternoonImgGoodObj, imgAfternoonGood);

//   scaleImage.x = CONST.CANVAS_STYLE_WIDTH / afternoonImgGoodObj.width;
//   scaleImage.y = CONST.CANVAS_STYLE_HEIGHT / afternoonImgGoodObj.height;

//   imageUtil.setImageObj([afternoonImgGoodObj], scaleImage, CONST.OPACITY_SHOW);

//   canvasGoodObj.add(afternoonImgGoodObj);
//   canvasGoodObj.renderAll();
// }

/* Demo animation. */
// var canvas, ctx;
// let alpha = 0;
// let animationId;
// let start = null;
// const duration = 2000; // 2 seconds

// function animate(timestamp) {
//   if (!start) start = timestamp;
//   var elapsed = timestamp - start;

//   ctx.drawImage(imgMorningGood, 0, 0, CONST.CANVAS_STYLE_WIDTH, CONST.CANVAS_STYLE_HEIGHT);

//   if (elapsed < duration) {

//     animationId = requestAnimationFrame(animate);

//     ctx.globalAlpha = alpha;

//     ctx.drawImage(imgAfternoonGood, 0, 0, CONST.CANVAS_STYLE_WIDTH, CONST.CANVAS_STYLE_HEIGHT);

//     alpha += 0.01;

//     if (alpha > 1) {
//       cancelAnimationFrame(animationId);
//     }
//   }
// }

/* --- */
var canvas;
var context;

const imageA = new Image();
imageA.src = "https://via.placeholder.com/200x200/FF0000";
const imageB = new Image();
imageB.src = "https://via.placeholder.com/200x200/0000FF";
const imageC = new Image();
imageC.src = "https://via.placeholder.com/200x200/008000";

let opacityA = 1;
let opacityB = 0;
let opacityC = 0;

let isAnimating = false;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.globalAlpha = opacityA;
  context.drawImage(imageA, 0, 0);

  context.globalAlpha = opacityB;
  context.drawImage(imageB, 0, 0);

  context.globalAlpha = opacityC;
  context.drawImage(imageC, 0, 0);
}

function animate(currentTime) {
  if (!isAnimating) {
    return;
  }

  if (currentTime <= 800) {
    opacityC = currentTime / 800;
  } else if (currentTime <= 1200) {
    opacityB = (currentTime - 400) / 800;
  } else if (currentTime <= 1450) {
    opacityB = 1 - (currentTime - 1200) / 800;
  } else if (currentTime <= 1850) {
    opacityC = 1 - (currentTime - 1450) / 500;
  } else {
    isAnimating = false;
    return;
  }

  draw();
  requestAnimationFrame(animate);
}

function startAnimation() {
  isAnimating = true;
  requestAnimationFrame(animate);
}




window.onload = function init() {

  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  draw();

  document.getElementById("startButton").addEventListener("click", startAnimation);

};
