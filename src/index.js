import { Application, Assets } from 'pixi.js';

import { SceneManager } from '^/core/scene/manager';
import { TitleScene } from '^/scenes/title';

(async () => {
  // App init
  const app = new Application();
  await app.init({
    background: '#000000',
    backgroundAlpha: 0,
    resizeTo: window,
  });

  const sceneManager = new SceneManager();
  sceneManager.init(app);
  sceneManager.changeScene(new TitleScene());

  document.querySelector('main').appendChild(app.canvas);
})();
