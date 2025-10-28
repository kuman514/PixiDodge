// This should be unique in the app. Therefore, this class has the Singleton pattern.
export class InputManager {
  static #instance = null;

  #keyHandler = null;

  constructor() {
    if (InputManager.#instance) {
      return InputManager.#instance;
    }

    this.#keyHandler = null;

    window.addEventListener('keydown', (event) => {
      this.#keyHandler?.onKeyDown?.(event);
    });

    window.addEventListener('keyup', (event) => {
      this.#keyHandler?.onKeyUp?.(event);
    });

    InputManager.#instance = this;
  }

  setKeyHandler(newKeyHandler) {
    this.#keyHandler = newKeyHandler;
  }

  clearKeyHandler() {
    this.#keyHandler = null;
  }
}
