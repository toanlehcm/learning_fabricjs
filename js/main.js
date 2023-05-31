var canvas, context;
var scaleImage = { width: 0, height: 0 };

var bgIndoor = new Image();
bgIndoor.src = CONST.BG_INDOOR;

function initCanvas() {
  canvas.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  canvas.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  canvas.width = CONST.CANVAS_WIDTH;
  canvas.height = CONST.CANVAS_HEIGHT;
}

function initImageObj() {
  scaleImage.width = CONST.CANVAS_WIDTH / bgIndoor.width;
  scaleImage.height = CONST.CANVAS_HEIGHT / bgIndoor.height;

  var scale = (scaleImage.width > 1 && scaleImage.height > 1) ?
    Math.min(scaleImage.width, scaleImage.height) :
    Math.max(scaleImage.width, scaleImage.height);

  context.drawImage(
    bgIndoor,
    0, 0,
    bgIndoor.width * scale, bgIndoor.height * scale
  );
}

window.onload = function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  initCanvas();

  initImageObj();
};
