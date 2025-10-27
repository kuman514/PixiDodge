import { Application, Assets } from 'pixi.js';

import { SceneManager } from '^/core/scene/manager';
import { TestScene, AnotherTestScene } from '^/scenes/test';

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

  // Temporary assets
  await Assets.load([
    {
      alias: 'koishi',
      src: 'https://pbs.twimg.com/profile_images/1175746616545857538/JuT5t8dm.jpg',
    },
    {
      alias: 'hoshino',
      src: 'https://static.wikitide.net/bluearchivewiki/thumb/a/a9/Hoshino.png/266px-Hoshino.png',
    },
  ]);

  // Generate test scene
  setInterval(() => {
    sceneManager.changeScene(new TestScene());
  }, 1000);
  setTimeout(() => {
    sceneManager.changeScene(new AnotherTestScene());
    setInterval(() => {
      sceneManager.changeScene(new AnotherTestScene());
    }, 1000);
  }, 500);

  document.querySelector('main').appendChild(app.canvas);
})();
