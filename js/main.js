var canvasGoodObj, canvasBadObj;
var scaleImage = { x: 0, y: 0 };
var morningImgGoodObj, afternoonImgGoodObj, eveningImgGoodObj;
var morningImgBadObj, afternoonImgBadObj, eveningImgBadObj;
var clipCircleObj;
var durationTime = 3000;
var formTimeOfDay, alertMsg;

var morningImgGood = new Image();
morningImgGood.src = CONST.MORNING_GOOD_IMG;

var morningImgBad = new Image();
morningImgBad.src = CONST.MORNING_BAD_IMG;

var afternoonImgGood = new Image();
afternoonImgGood.src = CONST.AFTERNOON_GOOD_IMG;

var afternoonImgBad = new Image();
afternoonImgBad.src = CONST.AFTERNOON_BAD_IMG;

var eveningImgGood = new Image();
eveningImgGood.src = CONST.EVENING_GOOD_IMG;

var eveningImgBad = new Image();
eveningImgBad.src = CONST.EVENING_BAD_IMG;

/* Initiate a canvas instance. */
function initCanvas() {
  canvasGoodObj = handleInitCanvas(canvasGoodObj, "canvasGood");

  canvasBadObj = handleInitCanvas(canvasBadObj, "canvasBad");
}

function handleInitCanvas(canvas, canvasID) {
  canvas = new fabric.Canvas(canvasID);
  canvas.setWidth(CONST.CANVAS_STYLE_WIDTH);
  canvas.setHeight(CONST.CANVAS_STYLE_HEIGHT);

  return canvas;
}

function initImageObj() {
  morningImgGoodObj = imageUtil.handleInitImgObj(
    morningImgGoodObj,
    morningImgGood
  );

  afternoonImgGoodObj = imageUtil.handleInitImgObj(
    afternoonImgGoodObj,
    afternoonImgGood
  );

  eveningImgGoodObj = imageUtil.handleInitImgObj(
    eveningImgGoodObj,
    eveningImgGood
  );

  morningImgBadObj = imageUtil.handleInitImgObj(
    morningImgBadObj,
    morningImgBad
  );

  afternoonImgBadObj = imageUtil.handleInitImgObj(
    afternoonImgBadObj,
    afternoonImgBad
  );

  eveningImgBadObj = imageUtil.handleInitImgObj(
    eveningImgBadObj,
    eveningImgBad
  );

  scaleImage.x = CONST.CANVAS_STYLE_WIDTH / morningImgGoodObj.width;
  scaleImage.y = CONST.CANVAS_STYLE_HEIGHT / morningImgGoodObj.height;

  imageUtil.setImageObj(
    [morningImgGoodObj, morningImgBadObj],
    scaleImage,
    CONST.OPACITY_SHOW
  );

  imageUtil.setImageObj(
    [
      afternoonImgGoodObj,
      afternoonImgBadObj,
      eveningImgGoodObj,
      eveningImgBadObj,
    ],
    scaleImage,
    CONST.OPACITY_HIDE
  );

  clipCircleObj = imageUtil.initClipCircle();

  canvasGoodAddImg();

  canvasBadAddImg();
}

function canvasGoodAddImg() {
  // canvasGoodObj.add(eveningImgGoodObj);
  canvasGoodObj.add(afternoonImgGoodObj);
  canvasGoodObj.add(morningImgGoodObj);
  canvasGoodObj.add(clipCircleObj);
  canvasGoodObj.renderAll();
}

function canvasBadAddImg() {
  // canvasBadObj.add(eveningImgBadObj);
  canvasBadObj.add(afternoonImgBadObj);
  canvasBadObj.add(morningImgBadObj);
  canvasBadObj.renderAll();
}

function dayToNight() {
  // Transition good image.
  DayByDay(
    morningImgGoodObj,
    afternoonImgGoodObj,
    eveningImgGoodObj,
    canvasGoodObj
  );

  // Transition bad image.
  DayByDay(
    morningImgBadObj,
    afternoonImgBadObj,
    eveningImgBadObj,
    canvasBadObj
  );
}

function nightToDay() {
  // Transition good image.
  DayByDay(
    afternoonImgGoodObj,
    morningImgGoodObj,
    eveningImgGoodObj,
    canvasGoodObj
  );

  // Transition bad image.
  DayByDay(
    afternoonImgBadObj,
    morningImgBadObj,
    eveningImgBadObj,
    canvasBadObj
  );
}

function DayByDay(startDay, midDay, endDay, canvas) {
  handleAnimate(startDay, CONST.OPACITY_HIDE, durationTime, canvas);

  midDay.animate("opacity", CONST.OPACITY_SHOW, {
    duration: durationTime,

    onChange: canvas.requestRenderAll.bind(canvas),

    // onComplete: function () {
    //   handleAnimate(midDay, CONST.OPACITY_HIDE, durationTime, canvas);

    //   handleAnimate(endDay, CONST.OPACITY_SHOW, durationTime, canvas);
    // },
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
    durationTime = parseInt(input.value);

    showMessage(msg_valid_success, true);
  }
}

function validateFormTime(event) {
  // stop form submission
  event.preventDefault();

  // validate the form
  hasValue(formTimeOfDay.elements["duration_time"], VALID_EMPTY, VALID_SUCCESS);

  formTimeOfDay.reset();
}

window.onload = function init() {
  formTimeOfDay = document.querySelector("#time_of_date");

  alertMsg = document.getElementById("alert_msg");

  initCanvas();

  initImageObj();
};
