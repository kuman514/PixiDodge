import { Container } from 'pixi.js';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '^/constants';

export class BaseScene extends Container {
  constructor() {
    super();
    if (this.constructor === BaseScene) {
      throw new Error(
        'BaseScene is an abstract class. Extend and implement the constructor, onEnter, and onExit.'
      );
    }

    this.width = SCREEN_WIDTH;
    this.height = SCREEN_HEIGHT;

    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;
  }

  onEnter() {
    throw new Error('This onEnter should be implemented.');
  }

  onExit() {
    throw new Error('This onExit should be implemented.');
  }
}
