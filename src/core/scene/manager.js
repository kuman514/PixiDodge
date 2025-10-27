import { Application } from 'pixi.js';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '^/constants';

// This should be unique in the app. Therefore, this class has the Singleton pattern.
export class SceneManager {
  #app = null;
  #currentScene = null;

  constructor() {
    if (SceneManager._instance) {
      return SceneManager._instance;
    }

    this.#app = null;
  }

  init(app) {
    if (!(app instanceof Application)) {
      throw new Error(
        // prettier-ignore
        'The parameter \'app\' of \'SceneManager.init\' should be an instance of PixiJS Application.'
      );
    }

    this.#app = app;

    // Fit main container to app screen, keeping its ratio
    this.#app.ticker.add(() => {
      if (!this.#currentScene) {
        return;
      }

      this.#currentScene.x = this.#app.renderer.width / 2;
      this.#currentScene.y = this.#app.renderer.height / 2;

      const targetRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
      const currentRatio = this.#app.renderer.width / this.#app.renderer.height;
      const scale =
        targetRatio < currentRatio
          ? this.#app.renderer.height / SCREEN_HEIGHT
          : this.#app.renderer.width / SCREEN_WIDTH;

      this.#currentScene.scale = scale;
    });
  }

  changeScene(newScene) {
    if (!this.#app) {
      throw new Error('The app is not initialized yet.');
    }

    if (this.#currentScene && this.#currentScene.onExit) {
      this.#currentScene.onExit();
    }

    if (this.#currentScene) {
      this.#app.stage.removeChild(this.#currentScene);
    }

    this.#currentScene = newScene;
    this.#app.stage.addChild(this.#currentScene);

    if (this.#currentScene && this.#currentScene.onEnter) {
      this.#currentScene.onEnter();
    }
  }
}
