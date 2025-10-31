import { Graphics } from 'pixi.js';

import { BaseObject } from '^/core/object/base';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '^/constants';

export class PlayerObject extends BaseObject {
  constructor() {
    super({
      width: 8,
      height: 8,
      initX: 0,
      initY: 120,
      collisionWidth: 2,
      collisionHeight: 2,
      clampX: [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
      clampY: [-SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2],
    });

    this.movingSpeed = 4;

    const graphics = new Graphics().rect(0, 0, 8, 8).fill({
      color: 0x00ff00,
    });

    const innerGraphics = new Graphics().rect(3, 3, 2, 2).fill({
      color: 0x0066ff,
    });

    this.addChild(graphics);
    this.addChild(innerGraphics);
  }

  move(x, y) {
    super.move(x * this.movingSpeed, y * this.movingSpeed);
  }
}
