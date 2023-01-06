var canvasGood, canvasGoodObj;
var scaleImage = { x: 0, y: 0 };
var afternoonImgGoodObj;
var afternoonImgBadObj;

var afternoonImgGood = new Image();
afternoonImgGood.src = CONST.AFTERNOON_GOOD_IMG;

/* Initiate a canvas instance. */
function initCanvas() {
  canvasGoodObj = new fabric.Canvas(canvasGood);
  canvasGoodObj.setWidth(CONST.CANVAS_STYLE_WIDTH);
  canvasGoodObj.setHeight(CONST.CANVAS_STYLE_HEIGHT);
}

function initImageObj() {
  afternoonImgGoodObj = imageUtil.handleInitImgObj(afternoonImgGoodObj, afternoonImgGood);

  scaleImage.x = CONST.CANVAS_STYLE_WIDTH / afternoonImgGoodObj.width;
  scaleImage.y = CONST.CANVAS_STYLE_HEIGHT / afternoonImgGoodObj.height;

  imageUtil.setImageObj([afternoonImgGoodObj], scaleImage, CONST.OPACITY_SHOW);

  canvasGoodObj.add(afternoonImgGoodObj);
  canvasGoodObj.renderAll();
}

window.onload = function init() {
  canvasGood = document.getElementById("canvas_good");

  initCanvas();

  initImageObj();
};
