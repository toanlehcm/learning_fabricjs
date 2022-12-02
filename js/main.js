// var test;
const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
var canvas, morningImg, midDayImg, eveningImg;

// const show = () => {
//   console.log("show");

//   test.classList.add("show-on-left");
//   test.classList.remove("hide-on-left");
// };

// const hide = () => {
//   console.log("hide");

//   test.classList.add("hide-on-left");
//   test.classList.remove("show-on-left");
// };

// const removeClass = () => {
//   test.classList.remove("show-on-left");
//   test.classList.remove("hide-on-left");
// };

function initCanvas(params) {
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

function changeImageBtn() {
  morningImg.animate("opacity", 0, {
    duration: 3000,

    onChange: canvas.requestRenderAll.bind(canvas),
  });

  midDayImg.animate("opacity", 1, {
    duration: 3000,

    onChange: canvas.requestRenderAll.bind(canvas),

    onComplete: function () {
      midDayImg.animate("opacity", 0, {
        duration: 3000,

        onChange: canvas.requestRenderAll.bind(canvas),
      });

      eveningImg.animate("opacity", 1, {
        duration: 3000,

        onChange: canvas.requestRenderAll.bind(canvas),
      });
    },
  });
}

window.onload = function init() {
  // test = document.getElementById("test");
  initCanvas();
};
