// var test;
var canvas, imageObject, tempSrc;

// const show = () => {
//   console.log("show");

//   test.classList.add("show-on-left");
//   test.classList.remove("hide-on-left");
// };

// const hide = () => {
//   console.log("hide");

//   test.classList.add("hide-on-left");
//   test.classList.remove("show-on-left");
// };

// const removeClass = () => {
//   test.classList.remove("show-on-left");
//   test.classList.remove("hide-on-left");
// };

function initCanvas(params) {
  // Initiate a canvas instance
  canvas = new fabric.Canvas("canvas");
  canvas.setWidth(document.body.scrollWidth);
  canvas.setHeight(500);

  // Using fromURL method
  fabric.Image.fromURL(
    "images/morning.jpg",
    function (Img) {
      imageObject = Img;
      canvas.add(Img).renderAll();
    },
    {
      crossorigin: "anonymous",
    }
  );
}

function changeImageBtn() {
  // Using the setSrc method
  switch (imageObject._element.src) {
    default:
    case "http://192.168.22.101/learning_fabricjs/images/morning.jpg":
      tempSrc = "images/mid_day.png";
      break;

    case "http://192.168.22.101/learning_fabricjs/images/mid_day.png":
      tempSrc = "images/evening.jpg";
      break;

    case "http://192.168.22.101/learning_fabricjs/images/evening.jpg":
      tempSrc = "images/morning.jpg";
      break;
  }

  imageObject.setSrc(
    imageObject._element.src == tempSrc,

    imageObject.animate("opacity", imageObject.opacity === 1 ? 0 : 1, {
      duration: 500,

      onChange: canvas.renderAll.bind(canvas),

      onComplete: function () {
        canvas.renderAll();
      },

      easing: fabric.util.ease["easeInQuad"],
    })

    // function () {
    //   canvas.renderAll();
    // }
  );
}

window.onload = function init() {
  // test = document.getElementById("test");
  initCanvas();
};
