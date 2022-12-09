const CONST = (function () {
  const CLIENT_WIDTH = document.documentElement.clientWidth;
  const CLIENT_HEIGHT = document.documentElement.clientHeight;
  const CANVAS_STYLE_WIDTH = CLIENT_WIDTH;
  const CANVAS_STYLE_HEIGHT = CLIENT_HEIGHT / 2;

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

  const MORNING_GOOD_IMG = "images/morning.jpg";

  const AFTERNOON_GOOD_IMG = "images/afternoon.jpg";

  const EVENING_GOOD_IMG = "images/evening.jpg";

  const OPACITY_HIDE = 0;
  const OPACITY_SHOW = 1;

  const VALID_EMPTY = "Please enter duration time";
  const VALID_SUCCESS = "Change duration time successful.";

  return {
    CANVAS_STYLE_WIDTH: CANVAS_STYLE_WIDTH,
    CANVAS_STYLE_HEIGHT: CANVAS_STYLE_HEIGHT,
    DESIRED_RADIUS: DESIRED_RADIUS,
    MORNING_GOOD_IMG: MORNING_GOOD_IMG,
    AFTERNOON_GOOD_IMG: AFTERNOON_GOOD_IMG,
    EVENING_GOOD_IMG: EVENING_GOOD_IMG,
    OPACITY_HIDE: OPACITY_HIDE,
    OPACITY_SHOW: OPACITY_SHOW,
    VALID_EMPTY: VALID_EMPTY,
    VALID_SUCCESS: VALID_SUCCESS,
    DEFAULT_LENS_POSITION: DEFAULT_LENS_POSITION,
  };
})();
