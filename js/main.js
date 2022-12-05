const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const OPACITY_HIDE = 0;
const OPACITY_SHOW = 1;
var durationTime = 3000;

const VALID_EMPTY = "Please enter duration time";
const VALID_SUCCESS = "Change duration time successful.";

var canvas, morningImg, afternoonImg, eveningImg;
var formTimeOfDay, alertMsg;

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
      opacity: OPACITY_SHOW,
    });

    canvas.add(morningImg).renderAll();
  });

  // Set mid-day image.
  fabric.Image.fromURL("images/afternoon.png", function (Img) {
    afternoonImg = Img;

    afternoonImg.set({
      scaleX: CLIENT_WIDTH / afternoonImg.width,
      scaleY: CLIENT_HEIGHT / 2 / afternoonImg.height,
      opacity: OPACITY_HIDE,
    });

    canvas.add(afternoonImg).renderAll();
  });

  // Set evening image.
  fabric.Image.fromURL("images/evening.jpg", function (Img) {
    eveningImg = Img;

    eveningImg.set({
      scaleX: CLIENT_WIDTH / eveningImg.width,
      scaleY: CLIENT_HEIGHT / 2 / eveningImg.height,
      opacity: OPACITY_HIDE,
    });

    canvas.add(eveningImg).renderAll();
  });
}

// function initImgObj(imgSrc, imgObj, opacityVal, canvas) {
//   fabric.Image.fromURL(imgSrc, function (Img) {
//     console.log("img-2: ", Img);
//     imgObj = Img;

//     imgObj.set({
//       scaleX: CLIENT_WIDTH / imgObj.width,
//       scaleY: CLIENT_HEIGHT / 2 / imgObj.height,
//       opacity: opacityVal,
//     });

//     canvas.add(imgObj).renderAll();

//     return imgObj;
//   });
// }

function dayToNight() {
  DayByDay(morningImg, afternoonImg, eveningImg, canvas);
}

function nightToDay() {
  DayByDay(eveningImg, afternoonImg, morningImg, canvas);
}

function DayByDay(startDay, midDay, endDay, canvas) {
  handleAnimate(startDay, OPACITY_HIDE, durationTime, canvas);

  midDay.animate("opacity", OPACITY_SHOW, {
    duration: durationTime,

    onChange: canvas.requestRenderAll.bind(canvas),

    onComplete: function () {
      handleAnimate(midDay, OPACITY_HIDE, durationTime, canvas);

      handleAnimate(endDay, OPACITY_SHOW, durationTime, canvas);
    },
  });
}

function handleAnimate(img, opacityVal, durationTime, canvas) {
  img.animate("opacity", opacityVal, {
    duration: durationTime,

    onChange: canvas.requestRenderAll.bind(canvas),
  });
}

// show a message with a type of the input
function showMessage(message, type) {
  // Set the message.
  alertMsg.innerText = message;

  // Update the class for the message.
  alertMsg.className = type ? "msg_success" : "msg_error";
}

function hasValue(input, msg_valid_empty, msg_valid_success) {
  if (input.value.trim() === "") {
    showMessage(msg_valid_empty, false);
  } else {
    // durationTime = parseInt(input.value);

    showMessage(msg_valid_success, true);
  }
}

function validateFormTime(event) {
  // stop form submission
  event.preventDefault();

  // validate the form
  hasValue(formTimeOfDay.elements["duration_time"], VALID_EMPTY, VALID_SUCCESS);
}

window.onload = function init() {
  formTimeOfDay = document.querySelector("#time_of_date");

  alertMsg = document.getElementById("alert_msg");

  // initCanvas();
};
