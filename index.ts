import { Boid } from "./Boid";
import { Follow, FollowCluster } from "./Flock";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
Boid.screenSize = [canvas.width, canvas.height];
ctx.fillStyle = `rgba(0,0,200, 0.5)`;

const flock = new FollowCluster(ctx, 400);

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flock.update();
  flock.draw();
  window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);
