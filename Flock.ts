import { Boid } from "./Boid";

export interface Flock {
  boids: Array<Boid>;
  size: number;
  update: () => void;
  draw: () => void;
}

export class Follow implements Flock {
  private ctx: CanvasRenderingContext2D;
  readonly size;
  boids = [] as Array<Boid>;

  behavior(on: Boid) {
    let avgAngle = 0;
    let avgDist = 0;
    for (const boid of this.boids) {
      if (boid === on) continue;
      avgAngle += on.angleTo(boid);
      avgDist += on.distanceTo(boid);
    }
    on.angle =
      avgAngle / this.boids.length -
      avgDist / this.boids.length / on.extras.affinity;
  }

  update() {
    for (const boid of this.boids) {
      this.behavior(boid);
      boid.forward(boid.extras.speed);
    }
  }

  draw() {
    for (const boid of this.boids) {
      boid.draw();
    }
  }

  constructor(ctx: CanvasRenderingContext2D, size: number) {
    this.size = size;
    this.ctx = ctx;
    for (let i = 0; i < size; i++) {
      const boid = new Boid(
        ctx,
        Math.random() * Boid.screenSize[0],
        Math.random() * Boid.screenSize[1],
        {
          speed: Math.floor(Math.random() * 5 + 1),
          affinity: Math.floor(Math.random() * 10 - 20),
        },
      );
      this.boids.push(boid);
    }
  }
}

export class FollowCluster implements Flock {
  private ctx: CanvasRenderingContext2D;
  readonly size;
  boids = [] as Array<Boid>;

  behavior(on: Boid) {
    let avgAngle = 0;
    let avgDist = 0;
    for (const boid of this.boids) {
      if (boid === on) continue;
      avgAngle += on.angleTo(boid);
      avgDist += on.distanceTo(boid);
    }
    on.angle =
      avgAngle / this.boids.length -
      avgDist / this.boids.length / on.extras.affinity;
  }

  update() {
    for (const boid of this.boids) {
      this.behavior(boid);
      boid.forward(boid.extras.speed);
    }
  }

  draw() {
    for (const boid of this.boids) {
      boid.draw();
    }
  }

  constructor(ctx: CanvasRenderingContext2D, size: number) {
    this.size = size;
    this.ctx = ctx;
    for (let i = 0; i < size; i++) {
      const boid = new Boid(
        ctx,
        Math.random() * Boid.screenSize[0],
        Math.random() * Boid.screenSize[1],
        {
          speed: Math.floor(Math.random() * 5 + 1),
          affinity: Math.floor(Math.random() * 10 - 20),
        },
      );
      this.boids.push(boid);
    }
  }
}
