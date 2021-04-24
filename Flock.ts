import { Boid } from "./Boid";

export interface FlockConstructorArgs<T, I> {
  ctx: CanvasRenderingContext2D;
  size: number;
  behavior: (on: Boid<T>, boids: Array<Boid<T>>, runtimeInputs: I) => void;
  initBoid: (ctx: CanvasRenderingContext2D) => Boid<T>;
}

export class Flock<T, I> {
  private ctx: CanvasRenderingContext2D;
  readonly boids = [] as Array<Boid<T>>;
  readonly size: number = 10;
  private behavior: (
    on: Boid<T>,
    boids: Array<Boid<T>>,
    runtimeInputs: I,
  ) => void;
  draw() {
    for (const boid of this.boids) {
      boid.draw();
    }
  }

  update(runtimeInputs: I) {
    for (const boid of this.boids) {
      this.behavior(boid, this.boids, runtimeInputs);
    }
  }
  constructor({ ctx, size, behavior, initBoid }: FlockConstructorArgs<T, I>) {
    this.ctx = ctx;
    this.size = size;
    this.behavior = behavior;
    for (let i = 0; i < size; i++) {
      const boid = initBoid(ctx);
      this.boids.push(boid);
    }
  }
}
