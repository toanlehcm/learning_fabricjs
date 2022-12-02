// var test;
const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
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
  canvas.setWidth(CLIENT_WIDTH);
  canvas.setHeight(CLIENT_HEIGHT / 2);

  // Using fromURL method
  fabric.Image.fromURL(
    "images/morning.jpg",
    function (Img) {
      imageObject = Img;

      imageObject.set({
        scaleX: CLIENT_WIDTH / imageObject.width,
        scaleY: CLIENT_HEIGHT / 2 / imageObject.height,
      });

      canvas.add(imageObject).renderAll();
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
    (imageObject._element.src = tempSrc),
    // imageObject.animate("opacity", imageObject.opacity === 1 ? 0 : 1, {
    //   duration: 500,

    //   onChange: canvas.renderAll.bind(canvas),

    //   // onComplete: function () {
    //   //   canvas.renderAll();
    //   // },

    //   easing: fabric.util.ease["easeInQuad"],
    // }),

    function () {
      canvas.renderAll();
    }
  );
}

window.onload = function init() {
  // test = document.getElementById("test");
  initCanvas();
};
