let SCREEN_SIZE;

const SWIPE_DIRECTION = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

class Gestures {

  static async swipeUp(percent = 0.7) {
    await this.swipe('up', percent);
  }

  static async swipeDown(percent = 0.7) {
    await this.swipe('down', percent);
  }

  static async swipe(direction, percent) {
    SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();

    const startX = Math.floor(SCREEN_SIZE.width / 2);
    const startY = Math.floor(SCREEN_SIZE.height / 2);

    const endX = Math.floor(startX + (SCREEN_SIZE.width * percent * SWIPE_DIRECTION[direction].x));
    const endY = Math.floor(startY + (SCREEN_SIZE.height * percent * SWIPE_DIRECTION[direction].y));

    await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 300 },
        { type: 'pointerMove', duration: 800, x: endX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    await driver.releaseActions();
  }
}

export default Gestures;
