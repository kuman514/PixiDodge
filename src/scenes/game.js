import { Ticker } from 'pixi.js';

import { BaseScene } from '^/core/scene/base';
import { PlayerObject } from '^/objects/player';

/**
 * @todo
 * Implement game
 */

export class GameScene extends BaseScene {
  constructor() {
    super();

    // [up, down, left, right]
    this.isPressed = [false, false, false, false];

    this.playerObject = new PlayerObject();
    this.addChild(this.playerObject);

    this.update = (timer) => {
      let horizontalDirection =
        this.isPressed[2] !== this.isPressed[3]
          ? this.isPressed[2]
            ? -1
            : 1
          : 0;
      let verticalDirection =
        this.isPressed[0] !== this.isPressed[1]
          ? this.isPressed[0]
            ? -1
            : 1
          : 0;

      if (horizontalDirection !== 0 && verticalDirection !== 0) {
        horizontalDirection *= Math.SQRT1_2;
        verticalDirection *= Math.SQRT1_2;
      }
      horizontalDirection *= timer.deltaTime;
      verticalDirection *= timer.deltaTime;

      this.playerObject.move(horizontalDirection, verticalDirection);
    };

    this.ticker = new Ticker();
    this.ticker.add(this.update);
    this.ticker.start();
  }

  onEnter() {}

  onExit() {
    this.ticker.stop();
    this.ticker.remove(this.update);
  }

  onKeyDown(event) {
    // console.log('keydown', event.key);
    switch (event.key) {
      case 'ArrowUp':
      case 'W':
      case 'w':
        this.isPressed[0] = true;
        break;
      case 'ArrowDown':
      case 'S':
      case 's':
        this.isPressed[1] = true;
        break;
      case 'ArrowLeft':
      case 'A':
      case 'a':
        this.isPressed[2] = true;
        break;
      case 'ArrowRight':
      case 'D':
      case 'd':
        this.isPressed[3] = true;
        break;
    }
  }

  onKeyUp(event) {
    // console.log('keyup', event.key);
    switch (event.key) {
      case 'ArrowUp':
      case 'W':
      case 'w':
        this.isPressed[0] = false;
        break;
      case 'ArrowDown':
      case 'S':
      case 's':
        this.isPressed[1] = false;
        break;
      case 'ArrowLeft':
      case 'A':
      case 'a':
        this.isPressed[2] = false;
        break;
      case 'ArrowRight':
      case 'D':
      case 'd':
        this.isPressed[3] = false;
        break;
    }
  }
}
