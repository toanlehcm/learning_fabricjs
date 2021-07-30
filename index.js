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
var initCanvas = (id) => {
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

var canvas = initCanvas("canvas");
var mousePressed = false;

setBackground("https://picsum.photos/id/237/500/500", canvas);

canvas.on("mouse:move", (event) => {
  if (mousePressed) {
    canvas.setCursor("grab");
    canvas.renderAll();
    var mEvent = event.e;
    const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
    canvas.relativePan(delta);
  }
});

canvas.on("mouse:down", (event) => {
  mousePressed = true;
  canvas.setCursor("grab");
  canvas.renderAll();
});

canvas.on("mouse:up", (event) => {
  mousePressed = false;
  canvas.setCursor("default");
  canvas.renderAll();
});
