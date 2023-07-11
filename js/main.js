var cvDistortionHardware, ctxDistortionHardware;

var cvOffscreenHardwareLayers = {
  main: null,
  one: null,
  two: null,
  three: null
};

var ctxOffscreenHardwareLayers = {
  main: null,
  one: null,
  two: null,
  three: null
};

var scaleImage = { width: 0, height: 0 }, scale;

var bgImage = new Image();
bgImage.src = CONST.BG_OUTDOOR;

// Background layer.
var imgBgLayers = {
  main: new Image(),
  one: new Image(),
  two: new Image(),
  three: new Image(),
};

for (let [key, value] of Object.entries(imgBgLayers)) {
  imgBgLayers[key].src = CONST.BG_LAYER[key];
}

function initCanvas() {
  cvDistortionHardware.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvDistortionHardware.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvDistortionHardware.width = CONST.CANVAS_WIDTH;
  cvDistortionHardware.height = CONST.CANVAS_HEIGHT;

  for (let [key, value] of Object.entries(cvOffscreenHardwareLayers)) {
    cvOffscreenHardwareLayers[key].style.width = CONST.CANVAS_STYLE_WIDTH + "px";
    cvOffscreenHardwareLayers[key].style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

    cvOffscreenHardwareLayers[key].width = CONST.CANVAS_WIDTH;
    cvOffscreenHardwareLayers[key].height = CONST.CANVAS_HEIGHT;
  }
}

function initImageObj() {
  scaleImage.width = CONST.CANVAS_WIDTH / bgImage.width;
  scaleImage.height = CONST.CANVAS_HEIGHT / bgImage.height;

  scale = (scaleImage.width > 1 && scaleImage.height > 1) ?
    Math.min(scaleImage.width, scaleImage.height) :
    Math.max(scaleImage.width, scaleImage.height);

  for (let [key, value] of Object.entries(ctxOffscreenHardwareLayers)) {
    ctxOffscreenHardwareLayers[key].drawImage(
      imgBgLayers[key],
      0, 0,
      imgBgLayers[key].width * scale, imgBgLayers[key].height * scale
    );

    // StackBlur.canvasRGB(cvOffscreenHardwareLayers.one, 0, 0, cvOffscreenHardwareLayers.one.width, cvOffscreenHardwareLayers.one.height, 6);
  }
}

function updateDistortionInHardware() {

  // Layer 1.
  ctxOffscreenHardwareLayers.main.drawImage(
    cvOffscreenHardwareLayers.one,
    0, 0,
    cvOffscreenHardwareLayers.one.width, cvOffscreenHardwareLayers.one.height
  );

  // Layer 2.
  ctxOffscreenHardwareLayers.main.drawImage(
    cvOffscreenHardwareLayers.two,
    0, 0,
    cvOffscreenHardwareLayers.two.width, cvOffscreenHardwareLayers.two.height
  );

  // Layer 3.
  ctxOffscreenHardwareLayers.main.drawImage(
    cvOffscreenHardwareLayers.three,
    0, 0,
    cvOffscreenHardwareLayers.three.width, cvOffscreenHardwareLayers.three.height
  );

  // Canvas distortion hardware.
  ctxDistortionHardware.drawImage(
    cvOffscreenHardwareLayers.main,
    0, 0,
    cvOffscreenHardwareLayers.main.width, cvOffscreenHardwareLayers.main.height
  );

  // ctxDistortionHardware.filter = 'blur(10px)';
  // $(cvDistortionHardware).css("filter", "blur(" + 6 + "px)");
  // cvDistortionHardware.style.webkitFilter = "blur(13px)";
}

window.onload = function init() {
  cvDistortionHardware = document.getElementById("distortion_hardware");
  ctxDistortionHardware = cvDistortionHardware.getContext("2d");

  for (let [key, value] of Object.entries(cvOffscreenHardwareLayers)) {
    cvOffscreenHardwareLayers[key] = document.createElement("canvas");
  }

  for (let [key, value] of Object.entries(ctxOffscreenHardwareLayers)) {
    ctxOffscreenHardwareLayers[key] = cvOffscreenHardwareLayers[key].getContext("2d");
  }

  initCanvas();

  initImageObj();

  updateDistortionInHardware();
};
