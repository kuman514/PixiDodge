import { Application, Assets, Container, Sprite, Texture } from 'pixi.js';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '^/shared/screen/constants';

(async () => {
  // App init
  const app = new Application();
  await app.init({
    background: '#000000',
    backgroundAlpha: 0,
    resizeTo: window,
  });

  // Generate main container
  const container = new Container();
  container.width = SCREEN_WIDTH;
  container.height = SCREEN_HEIGHT;
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  // Generate background for main container
  await Assets.load({
    alias: 'koishi',
    src: 'https://pbs.twimg.com/profile_images/1175746616545857538/JuT5t8dm.jpg',
  });
  const background = new Sprite({
    texture: Texture.from('koishi'),
    anchor: 0.5,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  container.addChild(background);

  // Fit main container to app screen, keeping its ratio
  app.stage.addChild(container);
  app.ticker.add(() => {
    container.x = app.renderer.width / 2;
    container.y = app.renderer.height / 2;

    const targetRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
    const currentRatio = app.renderer.width / app.renderer.height;
    const scale =
      targetRatio < currentRatio
        ? app.renderer.height / SCREEN_HEIGHT
        : app.renderer.width / SCREEN_WIDTH;

    container.scale = scale;
  });

  document.querySelector('main').appendChild(app.canvas);
})();
