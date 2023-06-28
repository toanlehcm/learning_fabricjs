var canvas, context;
var scaleImage = { width: 0, height: 0 }, scale;

var bgIndoor = new Image();
bgIndoor.src = CONST.BG_INDOOR;

function initCanvas() {
  canvas.style.width = CONST.CANVAS_STYLE_WIDTH + "px";
  canvas.style.height = CONST.CANVAS_STYLE_HEIGHT + "px";

  canvas.width = CONST.CANVAS_WIDTH;
  canvas.height = CONST.CANVAS_HEIGHT;
}

function initImageObj() {
  scaleImage.width = CONST.CANVAS_WIDTH / bgIndoor.width;
  scaleImage.height = CONST.CANVAS_HEIGHT / bgIndoor.height;

  scale = (scaleImage.width > 1 && scaleImage.height > 1) ?
    Math.min(scaleImage.width, scaleImage.height) :
    Math.max(scaleImage.width, scaleImage.height);

  context.drawImage(
    bgIndoor,
    0, 0,
    bgIndoor.width * scale, bgIndoor.height * scale
  );
}

function testD3js() {
  var canvasD3 = d3.select('#container').append('canvas').attr('width', CONST.CANVAS_STYLE_WIDTH).attr('height', CONST.CANVAS_STYLE_HEIGHT);

  var contextD3 = canvasD3.node().getContext('2d');

  contextD3.drawImage(
    bgIndoor,
    0, 0,
    bgIndoor.width * scale, bgIndoor.height * scale
  );

  var fisheye = d3.fisheye.circular()
    .radius(200)
    .distortion(200);

  canvasD3.on("mousemove", function () {
    console.log('move');
    fisheye.focus(d3.pointer(this));

    // fisheye.focus(d3.mouse(this));

    // select all the circles
    d3.selectAll("circle.data").each(function (d) { d.fisheye = fisheye(d); })
      // make them grow and shrink and dance
      .attr("cx", function (d) { return d.fisheye.x; })
      .attr("cy", function (d) { return d.fisheye.y; })
      .attr("r", function (d) { return d.fisheye.z * 4.5; });
  });
}

// ----
d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json").then(draw);

function draw(data) {

  const fisheye = fisheyeO.circular()
    .radius(100)
    .distortion(5);

  const height = 400;
  const width = 500;

  data

  const simulation = d3.forceSimulation(data.nodes)
    .alphaDecay(0.001)
    .alphaMin(0.01)
    .force("link", d3.forceLink(data.links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2));

  const svg = d3.select("body").append("svg")
    .attr("viewBox", [0, 0, width, height])

  const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", 2);

  const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", "black")


  let xy = false;

  svg.on("mousemove", function () { xy = d3.mouse(this); })
    .on("mouseleave", function () { xy = false; })

  simulation.on("tick", position)
    .on("end", function () {
      svg.on("mousemove.position", position);
    })

  function position() {
    if (xy) {
      fisheye.focus(xy);
      node.each(d => { d.fisheye = fisheye(d); })
    }
    else node.each(d => { d.fisheye = { x: 0, y: 0, z: 0 } })

    link
      .attr("x1", d => d.source.fisheye.x || d.source.x)
      .attr("y1", d => d.source.fisheye.y || d.source.y)
      .attr("x2", d => d.target.fisheye.x || d.target.x)
      .attr("y2", d => d.target.fisheye.y || d.target.y);

    node
      .attr("cx", d => d.fisheye.x || d.x)
      .attr("cy", d => d.fisheye.y || d.y);
  }

}


const fisheye0 = fisheyeO = {
  circular: () => {
    var radius = 200,
      distortion = 2,
      k0,
      k1,
      focus = [0, 0];

    function fisheye(d) {
      var dx = d.x - focus[0],
        dy = d.y - focus[1],
        dd = Math.sqrt(dx * dx + dy * dy);
      if (!dd || dd >= radius) return { x: 0, y: 0, z: dd >= radius ? 1 : 10 };
      var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
      return { x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10) };
    }

    function rescale() {
      k0 = Math.exp(distortion);
      k0 = k0 / (k0 - 1) * radius;
      k1 = distortion / radius;
      return fisheye;
    }

    fisheye.radius = function (_) {
      if (!arguments.length) return radius;
      radius = +_;
      return rescale();
    };

    fisheye.distortion = function (_) {
      if (!arguments.length) return distortion;
      distortion = +_;
      return rescale();
    };

    fisheye.focus = function (_) {
      if (!arguments.length) return focus;
      focus = _;
      return fisheye;
    };

    return rescale();
  }
}
// ----

window.onload = function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  initCanvas();

  initImageObj();

  // testD3js();
};
