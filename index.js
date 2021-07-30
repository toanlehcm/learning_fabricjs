// var canvas = new fabric.Canvas("canvas", {
//   width: 500,
//   height: 500,
//   // backgroundColor: "red"
// });

// canvas.renderAll();

// fabric.Image.fromURL("https://picsum.photos/id/237/500/500", function (img) {
//     img.set({
//         width : canvas.width,
//         height : canvas.height
//     });
//   canvas.setBackgroundImage(img);
//   canvas.renderAll();
//   //   canvas.add(img).renderAll().setActiveObject(img);
// });
// ---------------
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    selection: false,
  });
};

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, function (img) {
    img.set({
      width: canvas.width,
      height: canvas.height,
    });
    canvas.setBackgroundImage(img);
    canvas.renderAll();
  });
};

const setPanEvent = (canvas) => {
  canvas.on("mouse:move", (event) => {
    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.renderAll();
      var mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
      canvas.relativePan(delta);
    }
  });

  canvas.on("mouse:down", (event) => {
    mousePressed = true;
    if (currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.renderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    mousePressed = false;
    canvas.setCursor("default");
    canvas.renderAll();
  });
};

const setColorListener = () => {
  const picker = document.getElementById("colorPicker");
  picker.addEventListener("change", (event) => {
    color = event.target.value;
    canvas.freeDrawingBrush.color = color;
    canvas.renderAll();
  });
};

const clearCanvas = (canvas, state) => {
  state.val = canvas.toSVG();
  canvas.getObjects().forEach((obj) => {
    if (obj !== canvas.backgroundImage) {
      canvas.remove(obj);
    }
  });
};

const restoreCanvas = (canvas, state, bgURL) => {
  if (state.val) {
    fabric.loadSVGFromString(state.val, (objects) => {
      objects = objects.filter((o) => o["xlink:href"] !== bgURL);
      canvas.add(...objects);
      canvas.requestRenderAll();
    });
  }
};

const createRect = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: "green",
    left: canvasCenter.left, // The left position of the rect.
    top: -50,
    originX: "center", // The position put the rect.
    originY: "center",
    cornerColor: "#fff",
    // lockScalingX: true,
    // lockScalingY: true,
    objectCaching: false,
  });

  canvas.add(rect);
  canvas.renderAll();

  rect.animate("top", canvasCenter.top, {
    onChange: canvas.renderAll.bind(canvas),
  });

  rect.on("selected", () => {
    // rect.fill = "#fff";
    rect.set("fill", "#fff");
    canvas.requestRenderAll();
  });

  rect.on("deselected", () => {
    // rect.fill = "green";
    rect.set("fill", "green");
    canvas.requestRenderAll();
  });
};

const createCircle = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const circle = new fabric.Circle({
    radius: 50,
    fill: "orange",
    left: canvasCenter.left,
    top: -50,
    originX: "center",
    originY: "center",
    cornerColor: "#fff",
    lockScalingX: true,
    lockScalingY: true,
    objectCaching: false,
  });

  canvas.add(circle);
  canvas.renderAll();

  circle.animate("top", canvas.height - 50, {
    onChange: canvas.renderAll.bind(canvas),
    onComplete: () => {
      circle.animate("top", canvasCenter.top, {
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeOutBounce,
        duration: 200,
      });
    },
  });

  circle.on("selected", () => {
    // circle.fill = "#fff";
    circle.set("fill", "#fff");
    canvas.renderAll();
  });

  circle.on("deselected", () => {
    // circle.fill = "orange";
    circle.set("fill", "orange");
    canvas.renderAll();
  });
};

const groupObject = (canvas, group, shouldGroup) => {
  if (shouldGroup) {
    const objects = canvas.getObjects();
    group.val = new fabric.Group(objects, { cornerColor: "white" });
    clearCanvas(canvas);
    canvas.add(group.val);
    canvas.requestRenderAll();
  } else {
    group.val.destroy();
    const oldGroup = group.val.getObjects();
    canvas.remove(group.val);
    canvas.add(...oldGroup);
    group.val = null;
    canvas.requestRenderAll();
  }
};

const imgAdded = (e) => {
  const inputElem = document.getElementById("myImg");
  const file = inputElem.files[0];
  reader.readAsDataURL(file);
};

var canvas = initCanvas("canvas");
var svgState = {};
var mousePressed = false;
var color = "#000";
var group = {};
var bgURL = "https://picsum.photos/id/100/500/500";

let currentMode;
const modes = {
  pan: "pan",
  drawing: "drawing",
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.renderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      canvas.isDrawingMode = false;
      canvas.renderAll();
    } else {
      // canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
      // canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
      // canvas.freeDrawingBrush.color = "red";
      // canvas.freeDrawingBrush.width = 15;
      currentMode = modes.drawing;
      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
  }
};

const reader = new FileReader();

setBackground(bgURL, canvas);

setPanEvent(canvas);

setColorListener();

const inputFile = document.getElementById("myImg");
inputFile.addEventListener("change", imgAdded);

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    canvas.add(img);
    canvas.requestRenderAll();
  });
});
