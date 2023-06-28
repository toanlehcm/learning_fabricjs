var canvas, context;
var scaleImage = { width: 0, height: 0 }, scale;

var bgImage = new Image();
bgImage.src = CONST.BG_OUTDOOR;

var intensityInput, phaseInput;

function initCanvas() {
  canvas.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  canvas.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  canvas.width = CONST.CANVAS_WIDTH;
  canvas.height = CONST.CANVAS_HEIGHT;
}

function initImageObj() {
  scaleImage.width = CONST.CANVAS_WIDTH / bgImage.width;
  scaleImage.height = CONST.CANVAS_HEIGHT / bgImage.height;

  scale = (scaleImage.width > 1 && scaleImage.height > 1) ?
    Math.min(scaleImage.width, scaleImage.height) :
    Math.max(scaleImage.width, scaleImage.height);

  context.drawImage(
    bgImage,
    0, 0,
    bgImage.width * scale, bgImage.height * scale
  );
}



function renderStatic() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(
    bgImage,
    0, 0,
    bgImage.width * scale, bgImage.height * scale
  );

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = phaseInput.valueAsNumber % 4; i < imageData.data.length; i += 4) {

    // Setting the start of the loop to a different integer will change the aberration color, but a start integer of 4n-1 will not work
    imageData.data[i] = imageData.data[i + 4 * intensityInput.valueAsNumber];
  }

  context.putImageData(imageData, 0, 0);
}

window.onload = function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  intensityInput = document.getElementById("intensity_input");
  phaseInput = document.getElementById("phase_input");;

  initCanvas();

  initImageObj();

  intensityInput.addEventListener('input', () => {
    renderStatic();
  });

  phaseInput.addEventListener('input', () => {
    renderStatic();
  });

  renderStatic();
};
