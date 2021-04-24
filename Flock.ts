import { Boid } from "./Boid";

export interface FlockConstructorArgs<T> {
  ctx: CanvasRenderingContext2D;
  size: number;
  behavior: (on: Boid<T>, boids: Array<Boid<T>>) => void;
  initBoid: (ctx: CanvasRenderingContext2D) => Boid<T>;
}

export class Flock<T> {
  private ctx: CanvasRenderingContext2D;
  readonly boids = [] as Array<Boid<T>>;
  readonly size: number = 10;
  private behavior: (on: Boid<T>, boids: Array<Boid<T>>) => void;
  draw() {
    for (const boid of this.boids) {
      boid.draw();
    }
  }

  update() {
    for (const boid of this.boids) {
      this.behavior(boid, this.boids);
    }
  }
  constructor({ ctx, size, behavior, initBoid }: FlockConstructorArgs<T>) {
    this.ctx = ctx;
    this.size = size;
    this.behavior = behavior;
    for (let i = 0; i < size; i++) {
      const boid = initBoid(ctx);
      this.boids.push(boid);
    }
  }
}

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
  on.rotate(on.angleTo(closest) / 20);
  on.forward(on.extras.speed);
};

export const FollowCluster = (ctx: CanvasRenderingContext2D) =>
  new Flock({ ctx, size: 200, behavior: followClusterBehavior, initBoid });

// export class Follow implements Flock {
//   private ctx: CanvasRenderingContext2D;
//   readonly size;
//   boids = [] as Array<Boid>;

//   behavior(on: Boid) {
//     let avgAngle = 0;
//     let avgDist = 0;
//     for (const boid of this.boids) {
//       if (boid === on) continue;
//       avgAngle += on.angleTo(boid);
//       avgDist += on.distanceTo(boid);
//     }
//     on.angle =
//       avgAngle / this.boids.length -
//       avgDist / this.boids.length / on.extras.affinity;
//   }

//   update() {
//     for (const boid of this.boids) {
//       this.behavior(boid);
//       boid.forward(boid.extras.speed);
//     }
//   }

//   draw() {
//     for (const boid of this.boids) {
//       boid.draw();
//     }
//   }

//   constructor(ctx: CanvasRenderingContext2D, size: number) {
//     this.size = size;
//     this.ctx = ctx;
// for (let i = 0; i < size; i++) {
//   const boid = new Boid(
//     ctx,
//     Math.random() * Boid.screenSize[0],
//     Math.random() * Boid.screenSize[1],
//     {
//       speed: Math.floor(Math.random() * 5 + 1),
//       affinity: Math.floor(Math.random() * 10 - 20),
//     },
//   );
//   this.boids.push(boid);
// }
//   }
// }

// export class FollowCluster implements Flock {
//   private ctx: CanvasRenderingContext2D;
//   readonly size;
//   boids = [] as Array<Boid>;

//   behavior(on: Boid) {
//     let closest;
//     let closestDistance = Infinity;
//     for (const boid of this.boids) {
//       if (boid === on) continue;
//       const distance = on.distanceTo(boid);
//       if (distance < closestDistance) {
//         closest = boid;
//         closestDistance = distance;
//       }
//     }
//     on.rotate(on.angleTo(closest) / 20);
//   }

//   update() {
//     for (const boid of this.boids) {
//       this.behavior(boid);
//       boid.forward(boid.extras.speed);
//     }
//   }

//   draw() {
//     for (const boid of this.boids) {
//       boid.draw();
//     }
//   }

//   constructor(ctx: CanvasRenderingContext2D, size: number) {
//     this.size = size;
//     this.ctx = ctx;
//     for (let i = 0; i < size; i++) {
//       const boid = new Boid(
//         ctx,
//         Math.random() * Boid.screenSize[0],
//         Math.random() * Boid.screenSize[1],
//         {
//           speed: Math.floor(Math.random() * 5 + 1),
//           affinity: Math.floor(Math.random() * 10 - 20),
//         },
//         `rgba(${Math.random() * 255},${Math.random() * 255},${
//           Math.random() * 255
//         },0.7)`,
//       );
//       this.boids.push(boid);
//     }
//   }
// }
