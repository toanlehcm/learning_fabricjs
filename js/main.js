var cvDistortionHardware, ctxDistortionHardware;
var cvOffscreenHardwareLayerMain, ctxOffscreenHardwareLayerMain;
var cvOffscreenHardwareLayer1, ctxOffscreenHardwareLayer1;
var cvOffscreenHardwareLayer2, ctxOffscreenHardwareLayer2;
var cvOffscreenHardwareLayer3, ctxOffscreenHardwareLayer3;

var scaleImage = { width: 0, height: 0 }, scale;

var bgImage = new Image();
bgImage.src = CONST.BG_OUTDOOR;

// Background layer.
var imgBgLayer = {
  layer1: new Image(),
  layer2: new Image(),
  layer3: new Image(),
};

imgBgLayer.layer1.src = CONST.BG_LAYER.layer1;
imgBgLayer.layer2.src = CONST.BG_LAYER.layer2;
imgBgLayer.layer3.src = CONST.BG_LAYER.layer3;

function initCanvas() {
  cvDistortionHardware.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvDistortionHardware.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvDistortionHardware.width = CONST.CANVAS_WIDTH;
  cvDistortionHardware.height = CONST.CANVAS_HEIGHT;

  // Canvas offscreen main.
  cvOffscreenHardwareLayerMain.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvOffscreenHardwareLayerMain.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvOffscreenHardwareLayerMain.width = CONST.CANVAS_WIDTH;
  cvOffscreenHardwareLayerMain.height = CONST.CANVAS_HEIGHT;

  // Canvas offscreen layer 1.
  cvOffscreenHardwareLayer1.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvOffscreenHardwareLayer1.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvOffscreenHardwareLayer1.width = CONST.CANVAS_WIDTH;
  cvOffscreenHardwareLayer1.height = CONST.CANVAS_HEIGHT;

  // Canvas offscreen layer 2.
  cvOffscreenHardwareLayer2.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvOffscreenHardwareLayer2.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvOffscreenHardwareLayer2.width = CONST.CANVAS_WIDTH;
  cvOffscreenHardwareLayer2.height = CONST.CANVAS_HEIGHT;

  // Canvas offscreen layer 3.
  cvOffscreenHardwareLayer3.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  cvOffscreenHardwareLayer3.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  cvOffscreenHardwareLayer3.width = CONST.CANVAS_WIDTH;
  cvOffscreenHardwareLayer3.height = CONST.CANVAS_HEIGHT;
}

function initImageObj() {
  scaleImage.width = CONST.CANVAS_WIDTH / bgImage.width;
  scaleImage.height = CONST.CANVAS_HEIGHT / bgImage.height;

  scale = (scaleImage.width > 1 && scaleImage.height > 1) ?
    Math.min(scaleImage.width, scaleImage.height) :
    Math.max(scaleImage.width, scaleImage.height);

  ctxOffscreenHardwareLayerMain.drawImage(
    bgImage,
    0, 0,
    bgImage.width * scale, bgImage.height * scale
  );

  // Canvas offscreen layer 1.
  ctxOffscreenHardwareLayer1.drawImage(
    imgBgLayer.layer1,
    0, 0,
    imgBgLayer.layer1.width * scale, imgBgLayer.layer1.height * scale
  );

  // Canvas offscreen layer 2.
  ctxOffscreenHardwareLayer2.drawImage(
    imgBgLayer.layer2,
    0, 0,
    imgBgLayer.layer2.width * scale, imgBgLayer.layer2.height * scale
  );

  // Canvas offscreen layer 3.
  ctxOffscreenHardwareLayer3.drawImage(
    imgBgLayer.layer3,
    0, 0,
    imgBgLayer.layer3.width * scale, imgBgLayer.layer3.height * scale
  );
}

function updateDistortionInHardware() {

  // Layer 1.
  ctxOffscreenHardwareLayerMain.drawImage(
    cvOffscreenHardwareLayer1,
    0, 0,
    cvOffscreenHardwareLayer1.width, cvOffscreenHardwareLayer1.height
  );

  // Layer 2.
  ctxOffscreenHardwareLayerMain.drawImage(
    cvOffscreenHardwareLayer2,
    0, 0,
    cvOffscreenHardwareLayer2.width, cvOffscreenHardwareLayer2.height
  );

  // Layer 3.
  ctxOffscreenHardwareLayerMain.drawImage(
    cvOffscreenHardwareLayer3,
    0, 0,
    cvOffscreenHardwareLayer3.width, cvOffscreenHardwareLayer3.height
  );

  // Canvas distortion hardware.
  ctxDistortionHardware.drawImage(
    cvOffscreenHardwareLayerMain,
    0, 0,
    cvOffscreenHardwareLayerMain.width, cvOffscreenHardwareLayerMain.height
  );
}

window.onload = function init() {
  cvDistortionHardware = document.getElementById("distortion_hardware");
  ctxDistortionHardware = cvDistortionHardware.getContext("2d");

  // Canvas offscreen main.
  cvOffscreenHardwareLayerMain = document.createElement("canvas");
  ctxOffscreenHardwareLayerMain = cvOffscreenHardwareLayerMain.getContext("2d");

  // Canvas offscreen layer 1.
  cvOffscreenHardwareLayer1 = document.createElement("canvas");
  ctxOffscreenHardwareLayer1 = cvOffscreenHardwareLayer1.getContext("2d");

  // Canvas offscreen layer 2.
  cvOffscreenHardwareLayer2 = document.createElement("canvas");
  ctxOffscreenHardwareLayer2 = cvOffscreenHardwareLayer2.getContext("2d");

  // Canvas offscreen layer 3.
  cvOffscreenHardwareLayer3 = document.createElement("canvas");
  ctxOffscreenHardwareLayer3 = cvOffscreenHardwareLayer3.getContext("2d");

  initCanvas();

  initImageObj();

  updateDistortionInHardware();
};
