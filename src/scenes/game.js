import { BaseScene } from '^/core/scene/base';
import { PlayerObject } from '^/objects/player';

/**
 * @todo
 * Implement game
 */

export class GameScene extends BaseScene {
  constructor() {
    super();

    this.playerObject = new PlayerObject();
    this.addChild(this.playerObject);
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
