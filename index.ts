import { Boid } from "./Boid";
import { Follow, FollowCluster } from "./flocks/follow";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
Boid.screenSize = [canvas.width, canvas.height];
ctx.fillStyle = `rgba(0,0,200, 0.5)`;

const flock = FollowCluster(ctx);
// const boid1 = new Boid(ctx, 200, 200);
// const boid2 = new Boid(ctx, 200, 240);

// boid2.angle = boid2.angleTo(boid1);

let mousePos = {
  mouseX: 0,
  mouseY: 0,
};

document.addEventListener("mousemove", (e: MouseEvent) => {
  mousePos = { mouseX: e.clientX, mouseY: e.clientY };
  // console.log(boid1.angleToPoint(mousePos.mouseX, mousePos.mouseY));
});

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flock.update(mousePos);
  flock.draw();
  // boid1.angle = boid1.angleToPoint(mousePos.mouseX, mousePos.mouseY);
  // boid1.draw();
  // boid2.draw();
  window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);
