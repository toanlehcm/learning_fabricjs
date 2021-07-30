var canvas = new fabric.Canvas("canvas", {
  width: 500,
  height: 500,
  // backgroundColor: "red"
});

canvas.renderAll();

fabric.Image.fromURL("https://picsum.photos/id/237/500/500", function (img) {
    img.set({
        width : canvas.width,
        height : canvas.height
    });
  canvas.setBackgroundImage(img);
  canvas.renderAll();
  //   canvas.add(img).renderAll().setActiveObject(img);
});
