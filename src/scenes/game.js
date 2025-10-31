import { Ticker } from 'pixi.js';

import { BaseScene } from '^/core/scene/base';
import { PlayerObject } from '^/objects/player';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '^/constants';
import { ProjectileObject } from '^/objects/projectile';

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

    this.projectileObjects = Array.from(
      { length: SCREEN_WIDTH / 2 },
      (_, i) => new ProjectileObject(2 * i + 1 - SCREEN_WIDTH / 2)
    );
    this.projectileObjects.forEach((projectile) => {
      this.addChild(projectile);
    });

    this.update = (timer) => {
      // Projectile movement
      this.projectileObjects.forEach((projectile) => {
        projectile.move(0, timer.deltaTime);
        if (projectile.y > SCREEN_HEIGHT / 2 + 50) {
          projectile.resetRandom();
        }
      });

      // Player movement
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

      // Projectile collision
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
