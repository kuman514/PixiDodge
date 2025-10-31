import { Container } from 'pixi.js';

import { clamp } from '^/util/clamp';

export class BaseObject extends Container {
  constructor({
    width,
    height,
    initX,
    initY,
    collisionWidth,
    collisionHeight,
    clampX,
    clampY,
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

    this.clampX = clampX;
    this.clampY = clampY;
  }

  move(dx, dy) {
    if (this.clampX) {
      this.x = clamp({
        value: this.x + dx,
        min: this.clampX[0],
        max: this.clampX[1],
      });
    } else {
      this.x += dx;
    }
    if (this.clampY) {
      this.y = clamp({
        value: this.y + dy,
        min: this.clampY[0],
        max: this.clampY[1],
      });
    } else {
      this.y += dy;
    }
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
