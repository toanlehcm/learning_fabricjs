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
    width: 820, //"820" height="536"
    height: 536,
    selection: false,
  });
};

const setBackground = (url, canvas) => {
  fabric.Image.fromURL("img_foreground_good_no_bg.png", function (img) {
    img.set({
      // width: canvas.width,
      // height: canvas.height,
      // scaleX: 0.17,
      // scaleY: 0.17,
      // top: -249
      // ---------
      scaleX: 1.45*0.17,
      scaleY: 1.45*0.17,
      top: -604,
      left: -113
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
    clearCanvas(canvas, svgState);
    canvas.add(group.val);
    canvas.requestRenderAll();
  } else {
    group.val.destroy();
    let oldGroup = group.val.getObjects();
    // canvas.remove(group.val);
    clearCanvas(canvas, svgState);
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

drawCanvasTest();

const inputFile = document.getElementById("myImg");
inputFile.addEventListener("change", imgAdded);

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    canvas.add(img);
    canvas.requestRenderAll();
  });
});

// --------
var canvasSecond = new fabric.Canvas("canvas_second");

var rect2 = new fabric.Rect({
  left: 100,
  top: 100,
  fill: "red",
  width: 200,
  height: 200,
});

canvasSecond.add(rect2);

function goRight() {
  rect2.left = rect2.left + 10;
  // canvasSecond.renderAll();
  canvasSecond.requestRenderAll();
}

fabric.Image.fromURL("img_foreground_good_no_bg.png", function (img) {
  img.set({
    // width: 100,
    // height: 100,
    scaleX: 0.13,
    scaleY: 0.13,
    // left: "center",
    // top: "center",
  });
  canvasSecond.add(img);

  // img.animate("left", "+=500", {
  //   onChange: canvasSecond.renderAll.bind(canvasSecond),
  //   duration: 1000,
  //   easing: fabric.util.ease.easeOutBounce,
  // });

  // img.animate("angle", "+=90", {
  //   onChange: canvasSecond.renderAll.bind(canvasSecond),
  //   duration: 1000,
  // });

  // img.on('selected', function () {
  //   console.log('selected');
  // });

  // img.on('scaling', function () {
  //   console.log('scaling');
  // });

  // img.on("modified", function () {
  //   console.log("modified");
  // });
});

// Save canvas as image.
$("#save_as_image").click(function () {
  $("#canvas_second")
    .get(0)
    .toBlob(function (blob) {
      console.log($("#canvas_second").get(0));
      saveAs(blob, "myIMG.png");
    });
});

function drawCanvasTest() {
  var c = document.getElementById("canvas_test");
  var ctx = c.getContext("2d");
  var img = document.getElementById("scream");
  // ctx.drawImage(img, 0, -300, c.width*1.45, c.height*1.45);
  ctx.drawImage(img, -113, -604, img.naturalWidth*1.45*0.17, img.naturalHeight*1.45*0.17);
}
