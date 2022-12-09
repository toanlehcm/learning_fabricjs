var canvasObj, clipCircle;
var scaleImage = { x: 0, y: 0 };
var morningImgGoodObj, afternoonImgGoodObj, eveningImgGoodObj;
var durationTime = 3000;
var formTimeOfDay, alertMsg;

var morningImgGood = new Image();
morningImgGood.src = CONST.MORNING_GOOD_IMG;

var afternoonImgGood = new Image();
afternoonImgGood.src = CONST.AFTERNOON_GOOD_IMG;

var eveningImgGood = new Image();
eveningImgGood.src = CONST.EVENING_GOOD_IMG;

function initCanvas() {
  // Initiate a canvas instance
  canvasObj = new fabric.Canvas("canvas");
  canvasObj.setWidth(CONST.CANVAS_STYLE_WIDTH);
  canvasObj.setHeight(CONST.CANVAS_STYLE_HEIGHT);
}

function initImageObj() {
  morningImgGoodObj = new fabric.Image(morningImgGood);
  afternoonImgGoodObj = new fabric.Image(afternoonImgGood);
  eveningImgGoodObj = new fabric.Image(eveningImgGood);

  scaleImage.x = CONST.CANVAS_STYLE_WIDTH / morningImgGoodObj.width;
  scaleImage.y = CONST.CANVAS_STYLE_HEIGHT / morningImgGoodObj.height;

  setImageObj(
    [morningImgGoodObj],
    scaleImage,
    CONST.CANVAS_STYLE_WIDTH,
    CONST.CANVAS_STYLE_HEIGHT,
    CONST.OPACITY_SHOW
  );

  setImageObj(
    [afternoonImgGoodObj, eveningImgGoodObj],
    scaleImage,
    CONST.CANVAS_STYLE_WIDTH,
    CONST.CANVAS_STYLE_HEIGHT,
    CONST.OPACITY_HIDE
  );

  getCircleImg(
    canvasObj,
    morningImgGoodObj,
    afternoonImgGoodObj,
    eveningImgGoodObj
  );
}

function setImageObj(
  imageList,
  scaleImage,
  canvasStyleWidth,
  canvasStyleHeight,
  opacityVal
) {
  imageList.forEach((image) => {
    image.set({
      id: "imageObj",
      scaleX: scaleImage.x,
      scaleY: scaleImage.y,
      opacity: opacityVal,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      objectCaching: false,
      noScaleCache: false,
      dirty: false,
    });
  });
}

// Clip circle.
function getCircleImg(
  canvasObj,
  morningImgObj,
  afternoonImgObj,
  eveningImgObj
) {
  clipCircle = new fabric.Circle({
    // left: CONST.DEFAULT_LENS_POSITION.left,
    // top: CONST.DEFAULT_LENS_POSITION.top,
    left: 0,
    top: 0,
    radius: CONST.DESIRED_RADIUS,
    fill: "#fff",
    selectable: false,
    objectCaching: false,
    noScaleCache: false,
    dirty: false,
    globalCompositeOperation: "destination-in",
  });

  // canvasObj.add(eveningImgObj);
  canvasObj.add(afternoonImgObj);
  canvasObj.add(morningImgObj);
  canvasObj.add(clipCircle);
  canvasObj.renderAll();
}

function dayToNight() {
  DayByDay(
    morningImgGoodObj,
    afternoonImgGoodObj,
    eveningImgGoodObj,
    canvasObj
  );
}

function nightToDay() {
  DayByDay(
    afternoonImgGoodObj,
    morningImgGoodObj,
    eveningImgGoodObj,
    canvasObj
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
