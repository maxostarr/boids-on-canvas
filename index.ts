import { Boid } from "./Boid";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
// ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = `rgba(0,0,200, 0.5)`;
// ctx.fillRect(30, 30, 50, 50);
let x = 250;
let y = 250;
let scale = 5;
let t = 0;

const boid = new Boid(ctx);
boid.x = x;
boid.y = y;
boid.scale = 4;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boid.draw();
  boid.forward(1);
  boid.rotate(0.5 - Math.random());
  window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);
