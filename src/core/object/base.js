import { Container } from 'pixi.js';

export class BaseObject extends Container {
  constructor({
    width,
    height,
    initX,
    initY,
    collisionWidth,
    collisionHeight,
  }) {
    super();

    this.width = width;
    this.height = height;
    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;
    this.x = initX;
    this.y = initY;

    this.collisionWidth = collisionWidth;
    this.collisionHeight = collisionHeight;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isCollidingWith(anotherBaseObject) {
    // Using axis aligned bouding box collision detection
    const current = {
      x1: this.x - this.collisionWidth / 2,
      y1: this.y - this.collisionHeight / 2,
      x2: this.x + this.collisionWidth / 2,
      y2: this.y + this.collisionHeight / 2,
    };

    const another = {
      x1: anotherBaseObject.x - anotherBaseObject.collisionWidth / 2,
      y1: anotherBaseObject.y - anotherBaseObject.collisionHeight / 2,
      x2: anotherBaseObject.x + anotherBaseObject.collisionWidth / 2,
      y2: anotherBaseObject.y + anotherBaseObject.collisionHeight / 2,
    };

    return !(
      current.x2 < another.x1 ||
      current.x1 > another.x2 ||
      current.y2 < another.y1 ||
      current.y1 > another.y2
    );
  }
}
