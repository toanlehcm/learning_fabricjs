const imageUtil = (function () {
  function handleInitImgObj(imgObj, imgSrc) {
    return (imgObj = new fabric.Image(imgSrc));
  }

  function setImageObj(imageList, scaleImage, opacityVal) {
    imageList.forEach((image) => {
      image.set({
        id: "imageObj",
        top: 0,
        left: 0,
        scaleX: scaleImage.x,
        scaleY: scaleImage.y,
        opacity: opacityVal,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        objectCaching: false,
        noScaleCache: false,
        dirty: false,
      });
    });
  }

  function setImageBadObj(imageList, scaleImage, opacityVal) {
    imageList.forEach((image) => {
      image.set({
        id: "imageObj",
        scaleX: scaleImage.x,
        scaleY: scaleImage.y,
        opacity: opacityVal,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        objectCaching: false,
        noScaleCache: false,
        dirty: false,
      });
    });
  }

  // Clip circle.
  function initClipCircle() {
    var circleObj = new fabric.Circle({
      left: CONST.DEFAULT_LENS_POSITION.left,
      top: CONST.DEFAULT_LENS_POSITION.top,
      radius: CONST.DESIRED_RADIUS,
      fill: "#fff",
      selectable: false,
      objectCaching: false,
      noScaleCache: false,
      dirty: false,
      globalCompositeOperation: "destination-in",
    });

    return circleObj;
  }

  return {
    handleInitImgObj: handleInitImgObj,
    setImageObj: setImageObj,
    setImageBadObj: setImageBadObj,
    initClipCircle: initClipCircle,
  };
})();
