import { Graphics } from 'pixi.js';

import { SCREEN_HEIGHT } from '^/constants';
import { BaseObject } from '^/core/object/base';

export class ProjectileObject extends BaseObject {
  constructor(spawnX) {
    super({
      width: 2,
      height: 2,
      initX: spawnX,
      initY: -((Math.random() * SCREEN_HEIGHT) / 2) - SCREEN_HEIGHT / 2 - 100,
      collisionWidth: 2,
      collisionHeight: 2,
    });

    this.movingSpeed = Math.random() * 2 + 2;

    const graphics = new Graphics().rect(-1, -1, 2, 2).fill({
      color: 0xffff00,
    });

    this.addChild(graphics);
  }

  move(_, y) {
    super.move(0, y * this.movingSpeed);
  }

  resetRandom() {
    this.y = -((Math.random() * SCREEN_HEIGHT) / 2) - SCREEN_HEIGHT / 2 - 100;
    this.movingSpeed = Math.random() * 2 + 2;
  }
}
