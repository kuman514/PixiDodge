import { Texture, Sprite } from 'pixi.js';

import { BaseScene } from '^/core/scene/base';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '^/constants';

export class TestScene extends BaseScene {
  constructor() {
    super();
    const sprite = new Sprite({
      texture: Texture.from('koishi'),
      anchor: 0.5,
      width: SCREEN_WIDTH / 2,
      height: SCREEN_HEIGHT / 2,
    });
    this.addChild(sprite);
  }

  onEnter() {}

  onExit() {}
}

export class AnotherTestScene extends BaseScene {
  constructor() {
    super();
    const sprite = new Sprite({
      texture: Texture.from('hoshino'),
      anchor: 0.5,
      width: SCREEN_WIDTH / 2,
      height: SCREEN_HEIGHT / 2,
    });
    this.addChild(sprite);
  }

  onEnter() {}

  onExit() {}
}
