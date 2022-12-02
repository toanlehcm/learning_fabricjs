const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const OPACITY_HIDE = 0;
const OPACITY_SHOW = 1;
const DURATION_TIME = 3000;

var canvas, morningImg, midDayImg, eveningImg;

function initCanvas() {
  // Initiate a canvas instance
  canvas = new fabric.Canvas("canvas");
  canvas.setWidth(CLIENT_WIDTH);
  canvas.setHeight(CLIENT_HEIGHT / 2);

  // Set morning image.
  fabric.Image.fromURL("images/morning.jpg", function (Img) {
    morningImg = Img;

    morningImg.set({
      scaleX: CLIENT_WIDTH / morningImg.width,
      scaleY: CLIENT_HEIGHT / 2 / morningImg.height,
    });

    canvas.add(morningImg).renderAll();
  });

  // Set mid-day image.
  fabric.Image.fromURL("images/mid_day.png", function (Img) {
    midDayImg = Img;

    midDayImg.set({
      scaleX: CLIENT_WIDTH / midDayImg.width,
      scaleY: CLIENT_HEIGHT / 2 / midDayImg.height,
      opacity: 0,
    });

    canvas.add(midDayImg).renderAll();
  });

  // Set evening image.
  fabric.Image.fromURL("images/evening.jpg", function (Img) {
    eveningImg = Img;

    eveningImg.set({
      scaleX: CLIENT_WIDTH / eveningImg.width,
      scaleY: CLIENT_HEIGHT / 2 / eveningImg.height,
      opacity: 0,
    });

    canvas.add(eveningImg).renderAll();
  });
}

function dayToNight() {
  handleAnimate(morningImg, OPACITY_HIDE, DURATION_TIME, canvas);

  midDayImg.animate("opacity", OPACITY_SHOW, {
    duration: DURATION_TIME,

    onChange: canvas.requestRenderAll.bind(canvas),

    onComplete: function () {
      handleAnimate(midDayImg, OPACITY_HIDE, DURATION_TIME, canvas);

      handleAnimate(eveningImg, OPACITY_SHOW, DURATION_TIME, canvas);
    },
  });
}

function handleAnimate(img, opacityVal, durationTime, canvas) {
  img.animate("opacity", opacityVal, {
    duration: durationTime,

    onChange: canvas.requestRenderAll.bind(canvas),
  });
}

function nightToDay() {
  handleAnimate(eveningImg, OPACITY_HIDE, DURATION_TIME, canvas);

  midDayImg.animate("opacity", OPACITY_SHOW, {
    duration: DURATION_TIME,

    onChange: canvas.requestRenderAll.bind(canvas),

    onComplete: function () {
      handleAnimate(midDayImg, OPACITY_HIDE, DURATION_TIME, canvas);

      handleAnimate(morningImg, OPACITY_SHOW, DURATION_TIME, canvas);
    },
  });
}

window.onload = function init() {
  initCanvas();
};
