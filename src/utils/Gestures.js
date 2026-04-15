let SCREEN_SIZE;

class Gestures {

  /**
   * Swipe up within the SCROLLABLE portion of the screen only.
   * Targets the bottom half of the screen where the scrollable list lives.
   * Finger moves from ~85% to ~45% of screen height (within scrollable area).
   */
  static async swipeUpInScrollableArea() {
    SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();

    const startX = Math.floor(SCREEN_SIZE.width / 2);
    // Start from 85% of screen (deep in the scrollable bottom area)
    const startY = Math.floor(SCREEN_SIZE.height * 0.85);
    // End at 45% of screen (still within the scrollable area, above the list items)
    const endY = Math.floor(SCREEN_SIZE.height * 0.45);

    await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 300 },
        { type: 'pointerMove', duration: 1000, x: startX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    await driver.releaseActions();
    await driver.pause(600);
  }

  /**
   * General swipe up on full screen (for screens without split layout).
   */
  static async swipeUp(percentage = 0.8) {
    SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();

    const startX = Math.floor(SCREEN_SIZE.width / 2);
    const startY = Math.floor(SCREEN_SIZE.height * percentage);
    const endY = Math.floor(SCREEN_SIZE.height * 0.2);

    await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 200 },
        { type: 'pointerMove', duration: 1000, x: startX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    await driver.releaseActions();
    await driver.pause(500);
  }

  /**
   * Swipe within a specific element's bounds (for scrolling inside a container).
   * @param {string} containerSelector - selector for the scrollable container element
   */
  static async swipeUpInsideElement(containerSelector) {
    try {
      const container = await $(containerSelector);
      if (await container.isExisting()) {
        const location = await container.getLocation();
        const size = await container.getSize();

        const startX = Math.floor(location.x + size.width / 2);
        const startY = Math.floor(location.y + size.height * 0.8);
        const endY = Math.floor(location.y + size.height * 0.2);

        await driver.performActions([{
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 300 },
            { type: 'pointerMove', duration: 1000, x: startX, y: endY },
            { type: 'pointerUp', button: 0 }
          ]
        }]);

        await driver.releaseActions();
        await driver.pause(600);
        return true;
      }
    } catch (e) {
      console.log(`[Gestures] Could not swipe inside element: ${e.message}`);
    }
    return false;
  }

  /**
   * Swipe the screen in a given direction.
   * For 'up': finger drags from 75% to 25% of screen height.
   */
  static async swipeScreen(direction, times = 1) {
    const { width, height } = await driver.getWindowSize();
    const midX = Math.floor(width / 2);

    const swipeMap = {
      up:    { startX: midX, startY: Math.floor(height * 0.75), endX: midX, endY: Math.floor(height * 0.25) },
      down:  { startX: midX, startY: Math.floor(height * 0.25), endX: midX, endY: Math.floor(height * 0.75) },
      left:  { startX: Math.floor(width * 0.75), startY: Math.floor(height / 2), endX: Math.floor(width * 0.25), endY: Math.floor(height / 2) },
      right: { startX: Math.floor(width * 0.25), startY: Math.floor(height / 2), endX: Math.floor(width * 0.75), endY: Math.floor(height / 2) },
    };

    if (!swipeMap[direction]) throw new Error(`Invalid direction: ${direction}`);
    const { startX, startY, endX, endY } = swipeMap[direction];

    for (let i = 0; i < times; i++) {
      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: startX, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 200 },
            { type: "pointerMove", duration: 800, x: endX, y: endY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      await driver.releaseActions();
      await driver.pause(500);
    }
  }

  /**
   * Scroll down (swipe up) until a specific element becomes visible.
   * Strategy 1: Android UiScrollable (native, most reliable)
   * Strategy 2: Swipe within the scrollable bottom area of a split-screen layout
   * @param {string} accessibilityId - the accessibility id (without ~~ prefix)
   * @param {number} maxSwipes - max manual swipe attempts
   */
  static async scrollUntilElementVisible(accessibilityId, maxSwipes = 5) {
    // Strategy 1: Use Android UiScrollable (handles nested scrollable containers automatically)
    try {
      const uiScrollableSelector =
        `android=new UiScrollable(new UiSelector().scrollable(true))` +
        `.setMaxSearchSwipes(${maxSwipes})` +
        `.scrollIntoView(new UiSelector().description("${accessibilityId}"))`;

      const el = await $(uiScrollableSelector);
      if (await el.waitForDisplayed({ timeout: 10000 })) {
        return el;
      }
    } catch (e) {
      console.log(`[Gestures] UiScrollable failed for "${accessibilityId}": ${e.message}`);
    }

    // Strategy 2: Manual swipe in the scrollable area (bottom half of split screen)
    for (let i = 0; i < maxSwipes; i++) {
      try {
        const el = await $(`~~${accessibilityId}`);
        if (await el.isDisplayed()) {
          return el;
        }
      } catch {
        // element not found yet
      }
      // Swipe only in the bottom scrollable area
      await Gestures.swipeUpInScrollableArea();
    }

    // Final check after all swipes
    try {
      const el = await $(`~~${accessibilityId}`);
      if (await el.isDisplayed()) {
        return el;
      }
    } catch {
      // fall through to error
    }

    throw new Error(`Element with accessibilityId "${accessibilityId}" not found after ${maxSwipes} swipes`);
  }

}

export default Gestures;