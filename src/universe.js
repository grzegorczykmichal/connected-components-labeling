import paper, { Path, Point, Size, Color, PointText } from "paper";
import { ccl } from "./cc-label";
import { createEdges, getEdges } from "./edges";
import { scale } from "./scale";

const universe = (universe, world, cfg = {}) => {
  const tilesX = cfg.tiles || 25;
  const tilesY = cfg.tiles || 25;

  const rawTerain = initWorld(tilesX, tilesY);
  const { array: labeledTerain, lastLabel } = ccl(rawTerain, tilesX, tilesY);

  const scalar = scale(0, 360, 0, lastLabel);

  const universeDim = universe.getBoundingClientRect();

  const universeSize =
    universeDim.width < universeDim.height
      ? universeDim.width
      : universeDim.height;

  world.width = world.height = universeSize;

  paper.setup(world);

  const w = universeSize / tilesX;
  const h = universeSize / tilesY;

  labeledTerain.forEach((t, i) => {
    const x = i % tilesX;
    const y = parseInt(i / tilesY);
    if (t) {
      const color = { hue: parseInt(scalar(t)), saturation: 1, brightness: 1 };
      drawTile(x, y, w, h, color);
    }

    var text = new PointText(new Point(x * w + w / 2, y * h + h / 2));
    text.justification = "center";
    text.fillColor = new Color(0.5);
    text.content = `${t}`;
  });

  createEdges(rawTerain, tilesX, tilesY).forEach((t, i) => {
    let x = i % tilesX;
    let y = parseInt(i / tilesY);

    // var text = new PointText(new Point(x * w + w / 2, y * h + h / 4));
    // text.justification = "center";
    // text.fillColor = new Color(0.5);
    // text.content = `${t}`;

    x = x * w;
    y = y * h;

    // path.closed = false;

    // LEFT
    if ((t & 1) > 0) {
      const path = new Path();
      path.strokeColor = "hsl(209.3, 25.7%, 22.7%)";
      path.strokeWidth = 5;
      path.moveTo(x, y);
      path.lineTo(x, y + h);
      path.strokeCap = "round";
    }

    //BOTTOM
    if ((t & 2) > 0) {
      const path = new Path();
      path.strokeColor = "hsl(209.3, 25.7%, 22.7%)";
      path.strokeWidth = 5;
      path.moveTo(x, y + h);
      path.lineTo(x + w, y + h);
      path.strokeCap = "round";
    }

    // RIGHT
    if ((t & 4) > 0) {
      const path = new Path();
      path.strokeColor = "hsl(209.3, 25.7%, 22.7%)";
      path.strokeWidth = 5;
      path.moveTo(x + w, y);
      path.lineTo(x + w, y + h);
      path.strokeCap = "round";
    }

    // TOP
    if ((t & 8) > 0) {
      const path = new Path();
      path.strokeColor = "hsl(209.3, 25.7%, 22.7%)";
      path.strokeWidth = 5;
      path.moveTo(x + w, y);
      path.lineTo(x, y);
      path.strokeCap = "round";
    }
  });
};

const drawTile = (x, y, w, h, fillColor = "#000000") => {
  var point = new Point(x * w, y * h);
  var size = new Size(w, h);
  var tile = new Path.Rectangle(point, size);
  tile.onClick = function(event) {
    this.fillColor = "red";
  };
  tile.fillColor = fillColor;
};

const initWorld = (x, y) => {
  let worldArray = new Uint8Array(x * y);
  return worldArray.map(_ => (Math.random() > 0.5 ? 1 : 0));
};

export { universe };
