interface CanvasObject {
  x: number;
  y: number;
  angle: number;
  scale: number;
  color: string;
  extras: any;
  draw: () => void;
}

type Cords = Array<[number, number]>;

const scaleCoords = (coords: Cords, scale: number): Cords =>
  coords.map(([x, y]) => [x * scale, y * scale]);

const rotateCoords = (coords: Cords, angle: number): Cords =>
  coords.map(([x, y]) => [
    x * Math.cos(angle) - y * Math.sin(angle),
    x * Math.sin(angle) + y * Math.cos(angle),
  ]);

const drawFromCoords = (
  coords: Cords,
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): void => {
  ctx.beginPath();
  const screenX =
    ((x % Boid.screenSize[0]) + Boid.screenSize[0]) % Boid.screenSize[0];
  const screenY =
    ((y % Boid.screenSize[1]) + Boid.screenSize[1]) % Boid.screenSize[1];
  ctx.moveTo(screenX, screenY);
  for (const [dx, dy] of coords) {
    ctx.lineTo(screenX + dx, screenY + dy);
  }
  ctx.fill();
};

export class Boid implements CanvasObject {
  private _coords: Cords = [
    [0, 0],
    [2, -2],
    [0, -7],
    [-2, -2],
    [0, 0],
  ];

  public static screenSize = [500, 500];

  private _x = 0;
  private _y = 0;
  private _angle = Math.PI * 0.5;
  private ctx: CanvasRenderingContext2D;
  private _scale = 0;
  public color = "rgb(0,0,0)";
  public extras = {} as any;

  public get scale() {
    return this._scale;
  }
  public set scale(value) {
    this._scale = value;
    this._coords = scaleCoords(this._coords, value);
  }

  public get angle() {
    return this._angle;
  }
  public set angle(value) {
    const dTheta = value - this._angle;
    this._angle = value;
    this._coords = rotateCoords(this._coords, dTheta);
  }

  public get y() {
    return this._y;
  }
  public set y(value) {
    this._y =
      ((value % Boid.screenSize[1]) + Boid.screenSize[1]) % Boid.screenSize[1];
  }

  public get x() {
    return this._x;
  }
  public set x(value) {
    this._x =
      ((value % Boid.screenSize[0]) + Boid.screenSize[0]) % Boid.screenSize[0];
  }

  constructor(
    ctx: CanvasRenderingContext2D,
    x?: number,
    y?: number,
    extras?: object,
    color?: string,
  ) {
    this.ctx = ctx;
    this.color = color;
    this.extras = extras;
    this._x = x;
    this._y = y;
    this.scale = 3;
  }

  forward(steps: number) {
    const dx = Math.cos(this._angle) * steps;
    const dy = Math.sin(this._angle) * steps;
    this.x += dx;
    this.y += dy;
  }

  rotate(dTheta: number) {
    this.angle += dTheta;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    drawFromCoords(this._coords, this.ctx, this._x, this._y);
  }

  distanceTo(other: Boid) {
    return Math.sqrt((this._x - other._x) ** 2 + (this._y - other._y) ** 2);
  }

  angleTo(other: Boid) {
    return Math.atan2(other._y, other._x);
  }
}
