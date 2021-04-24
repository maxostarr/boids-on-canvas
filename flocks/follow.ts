import { Boid } from "../Boid";
import { Flock } from "../Flock";

const extras = {
  speed: Math.floor(Math.random() * 5 + 1),
  affinity: Math.floor(Math.random() * 10 - 20),
};

const initBoid = (ctx: CanvasRenderingContext2D) => {
  return new Boid(
    ctx,
    Math.random() * Boid.screenSize[0],
    Math.random() * Boid.screenSize[1],
    {
      speed: Math.floor(Math.random() * 5 + 1),
      affinity: Math.floor(Math.random() * 10 - 20),
    },
    `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.7)`,
  );
};

const followBehavior = (
  on: Boid<typeof extras>,
  boids: Array<Boid<typeof extras>>,
) => {
  let avgAngle = 0;
  let avgDist = 0;
  for (const boid of boids) {
    if (boid === on) continue;
    avgAngle += on.angleTo(boid);
    avgDist += on.distanceTo(boid);
  }
  on.angle =
    avgAngle / boids.length - avgDist / boids.length / on.extras.affinity;
  on.forward(on.extras.speed);
};

export const Follow = (ctx: CanvasRenderingContext2D) =>
  new Flock({ ctx, size: 200, behavior: followBehavior, initBoid });

const followClusterBehavior = (
  on: Boid<typeof extras>,
  boids: Array<Boid<typeof extras>>,
  { mouseX, mouseY }: { mouseX: number; mouseY: number },
) => {
  let closest;
  let closestDistance = Infinity;
  for (const boid of boids) {
    if (boid === on) continue;
    const distance = on.distanceTo(boid);
    if (distance < closestDistance) {
      closest = boid;
      closestDistance = distance;
    }
  }

  const targetAngleCloses = +on.angleTo(closest);

  const smallestAngleClosest =
    ((targetAngleCloses - on.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

  on.angle += smallestAngleClosest / 10;

  if (on.distanceToPoint(mouseX, mouseY) < 100) {
    const targetAngleMouse = Math.PI + on.angleToPoint(mouseX, mouseY);

    const smallestAngleMouse =
      ((targetAngleMouse - on.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

    on.angle += (smallestAngleMouse / on.distanceToPoint(mouseX, mouseY)) * 20;
  }
  on.extras.speed = Math.abs((Math.random() - 0.5) / 50 + on.extras.speed);
  on.forward(on.extras.speed);
};

export const FollowCluster = (ctx: CanvasRenderingContext2D) =>
  new Flock({ ctx, size: 300, behavior: followClusterBehavior, initBoid });
