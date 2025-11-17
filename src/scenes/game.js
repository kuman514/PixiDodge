import { Text, Ticker } from 'pixi.js';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '^/constants';
import { BaseScene } from '^/core/scene/base';
import { SceneManager } from '^/core/scene/manager';
import { PlayerObject } from '^/objects/player';
import { ProjectileObject } from '^/objects/projectile';

export class GameScene extends BaseScene {
  constructor() {
    super();

    this.ticker = new Ticker();

    const readyRender = new Text({
      text: 'Ready...',
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'center',
      },
      x: 0,
      y: 0,
    });

    this.score = 0;
    const scoreRender = new Text({
      text: '0',
      anchor: {
        x: 1,
        y: 0,
      },
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'right',
      },
      x: SCREEN_WIDTH / 2,
      y: -SCREEN_HEIGHT / 2,
    });

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
    this.addChild(scoreRender);
    this.addChild(readyRender);

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
      const isCollided = this.projectileObjects.some((projectile) =>
        projectile.isCollidingWith(this.playerObject)
      );

      if (isCollided) {
        this.ticker.stop();
        setTimeout(() => {
          new SceneManager().changeScene(
            new GameOverScene(Math.floor(this.score))
          );
        }, 1000);
      }

      this.score += 10 * timer.deltaTime;
      scoreRender.text = Math.floor(this.score);
    };

    setTimeout(() => {
      readyRender.text = 'Go!';
    }, 700);

    setTimeout(() => {
      this.removeChild(readyRender);
      this.ticker.add(this.update);
      this.ticker.start();
    }, 1500);
  }

  onEnter() {}

  onExit() {
    this.ticker.stop();
    this.ticker.remove(this.update);
  }

  onKeyDown(event) {
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
      case 'Shift':
        this.playerObject.movingSpeed = 2;
        break;
    }
  }

  onKeyUp(event) {
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
      case 'Shift':
        this.playerObject.movingSpeed = 4;
        break;
    }
  }
}

export class GameOverScene extends BaseScene {
  constructor(finalScore) {
    super();
    const title = new Text({
      text: 'Game Over',
      anchor: 0.5,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center',
      },
    });
    title.y = -30;
    this.addChild(title);

    const finalScoreText = new Text({
      text: `Final score: ${finalScore} pts.`,
      anchor: 0.5,
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'center',
      },
    });
    finalScoreText.y = 15;
    this.addChild(finalScoreText);

    const instruction = new Text({
      text: 'Press enter to play again',
      anchor: 0.5,
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'center',
      },
    });
    instruction.y = 50;
    this.addChild(instruction);
  }

  onEnter() {}

  onExit() {}

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        new SceneManager().changeScene(new GameScene());
        break;
    }
  }

  onKeyUp() {}
}
