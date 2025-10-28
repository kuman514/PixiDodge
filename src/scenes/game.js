import { BaseScene } from '^/core/scene/base';

/**
 * @todo
 * Implement game
 */

export class GameScene extends BaseScene {
  constructor() {
    super();
  }

  onEnter() {}

  onExit() {}

  onKeyDown(event) {
    console.log('keydown', event.key);
  }

  onKeyUp(event) {
    console.log('keyup', event.key);
  }
}
