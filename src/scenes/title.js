import { Text } from 'pixi.js';

import { BaseScene } from '^/core/scene/base';
import { SceneManager } from '^/core/scene/manager';
import { GameScene } from '^/scenes/game';

export class TitleScene extends BaseScene {
  constructor() {
    super();
    const title = new Text({
      text: 'PixiDodge',
      anchor: 0.5,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center',
      },
    });
    title.y = -25;
    this.addChild(title);

    const instruction = new Text({
      text: 'Press enter to play',
      anchor: 0.5,
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'center',
      },
    });
    instruction.y = 25;
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
