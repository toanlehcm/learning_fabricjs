const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const OPACITY_HIDE = 0;
const OPACITY_SHOW = 1;
const DURATION_TIME = 3000;

const VALID_EMPTY = "Please enter time of day";
const VALID_SUCCESS = "Change time of day successful.";

var canvas, morningImg, afternoonImg, eveningImg;
var alertMsg;

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
  handleAnimate(startDay, OPACITY_HIDE, DURATION_TIME, canvas);

  midDay.animate("opacity", OPACITY_SHOW, {
    duration: DURATION_TIME,

    onChange: canvas.requestRenderAll.bind(canvas),

    onComplete: function () {
      handleAnimate(midDay, OPACITY_HIDE, DURATION_TIME, canvas);

      handleAnimate(endDay, OPACITY_SHOW, DURATION_TIME, canvas);
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
function showMessage(input, message, type) {
  // Set the message.
  alertMsg.innerText = message;

  // Update the class for the message.
  alertMsg.className = type ? "msg_success" : "msg_error";

  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input, message) {
  return showMessage(input, message, true);
}

function hasValue(input, mess_valid_empty, mess_valid_success) {
  if (input.value.trim() === "") {
    return showError(input, mess_valid_empty);
  }

  return showSuccess(input, mess_valid_success);
}

function validateForm(event) {
  // stop form submission
  event.preventDefault();

  var formTimeOfDay = document.forms["form_time_of_day"];

  // validate the form
  hasValue(formTimeOfDay.elements["time_of_day"], VALID_EMPTY, VALID_SUCCESS);
}

window.onload = function init() {
  alertMsg = document.getElementById("alert_msg");

  initCanvas();
};
