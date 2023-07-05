const CONST = (function () {
  const CLIENT_WIDTH = document.documentElement.clientWidth;
  const CLIENT_HEIGHT = document.documentElement.clientHeight;

  const DEVICE_PIXEL_RATIO = 2;

  const CANVAS_STYLE_WIDTH = CLIENT_WIDTH;
  const CANVAS_STYLE_HEIGHT = CLIENT_HEIGHT / 2;

  const CANVAS_WIDTH = CANVAS_STYLE_WIDTH * DEVICE_PIXEL_RATIO;
  const CANVAS_HEIGHT = CANVAS_STYLE_HEIGHT * DEVICE_PIXEL_RATIO;

  // The center of the midground canvas.
  const CENTER_CANVAS = {
    x: CANVAS_STYLE_WIDTH / 2,
    y: CANVAS_STYLE_HEIGHT / 2,
  };

  const DESIRED_RADIUS = 170;

  const DEFAULT_LENS_POSITION = {
    left: CENTER_CANVAS.x - DESIRED_RADIUS,
    top: CENTER_CANVAS.y - DESIRED_RADIUS,
  };

  const MORNING_GOOD_IMG = "images/morning_good.jpg";

  const MORNING_BAD_IMG = "images/morning_good.jpg";

  const AFTERNOON_GOOD_IMG = "images/afternoon_good.jpg";

  const AFTERNOON_BAD_IMG = "images/afternoon_good.jpg";

  const EVENING_GOOD_IMG = "images/evening_good.jpg";

  const EVENING_BAD_IMG = "images/evening_good.jpg";

  const BG_INDOOR = "images/bg_all_in_base.jpg";

  const BG_OUTDOOR = "images/bg_outdoor.jpg";

  const OPACITY_HIDE = 0;
  const OPACITY_SHOW = 1;

  const VALID_EMPTY = "Please enter duration time";
  const VALID_SUCCESS = "Change duration time successful.";

  const BULGE_VALUE = 1;
  const PINCH_VALUE = -1;

  const BG_LAYER = {
    // layer1: "images/layer_1.png",
    // layer2: "images/layer_2.png",
    // layer3: "images/layer_3.png",

    layer1: "images/layer_1_blur.png",
    layer2: "images/layer_2_blur.png",
    layer3: "images/layer_3_blur.png",
  }

  return {
    DEVICE_PIXEL_RATIO: DEVICE_PIXEL_RATIO,

    CANVAS_STYLE_WIDTH: CANVAS_STYLE_WIDTH,
    CANVAS_STYLE_HEIGHT: CANVAS_STYLE_HEIGHT,
    CANVAS_WIDTH: CANVAS_WIDTH,
    CANVAS_HEIGHT: CANVAS_HEIGHT,

    DESIRED_RADIUS: DESIRED_RADIUS,

    MORNING_GOOD_IMG: MORNING_GOOD_IMG,
    MORNING_BAD_IMG: MORNING_BAD_IMG,
    AFTERNOON_GOOD_IMG: AFTERNOON_GOOD_IMG,
    AFTERNOON_BAD_IMG: AFTERNOON_BAD_IMG,
    EVENING_GOOD_IMG: EVENING_GOOD_IMG,
    EVENING_BAD_IMG: EVENING_BAD_IMG,
    BG_INDOOR: BG_INDOOR,
    BG_OUTDOOR: BG_OUTDOOR,

    OPACITY_HIDE: OPACITY_HIDE,
    OPACITY_SHOW: OPACITY_SHOW,
    VALID_EMPTY: VALID_EMPTY,
    VALID_SUCCESS: VALID_SUCCESS,
    DEFAULT_LENS_POSITION: DEFAULT_LENS_POSITION,
    CENTER_CANVAS: CENTER_CANVAS,
    BULGE_VALUE: BULGE_VALUE,
    PINCH_VALUE: PINCH_VALUE,

    BG_LAYER: BG_LAYER
  };
})();
