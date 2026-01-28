const platformKeyMap = {
  android: 'droid',
  ios: 'ios'
};

browser.overwriteCommand('$', async ($, selector) => {

  // Already an element
  if (selector?.elementId) {
    return selector;
  }

  // Plain string selector
  if (typeof selector === 'string') {
    return $(selector);
  }

  // Platform-based selector object
  if (selector?.droid || selector?.ios) {
    const resolved = driver.isIOS ? selector.ios : selector.droid;

    // 🔥 HANDLE ARRAY HERE (THIS WAS MISSING)
    if (Array.isArray(resolved)) {
      for (const sel of resolved) {
        try {
          const el = await $(sel);
          if (await el.isExisting()) {
            return el;
          }
        } catch { }
      }
      throw new Error(
        `[SELECTOR ERROR] None of the selectors matched: ${JSON.stringify(resolved)}`
      );
    }

    // Single selector
    return $(resolved);
  }

  throw new Error(
    `[SELECTOR ERROR] Invalid selector passed to $(): ${JSON.stringify(selector)}`
  );
});


browser.overwriteCommand('$$', async ($$, selector) => {
  if (typeof selector === 'string') {
    return $$(selector);
  }
  if (selector?.droid || selector?.ios) {
    return $$(getSelectorByPlatform(selector));
  }
  throw new Error(`[SELECTOR ERROR] Invalid selector passed to $$(): ${JSON.stringify(selector)}`);
});

function getSelectorByPlatform(selector) {
  const platform = getPlatform();
  const key = platformKeyMap[platform];
  if (!key || !selector[key]) {
    throw new Error(`Selector not set for ${platform} platform`);
  }
  return selector[key];
}

function getPlatform() {
  if (!driver.isMobile) return 'web';
  return driver.isIOS ? 'ios' : 'android';
}

export async function waitAndFindElement(selector, timeout = 15000) {
  if (!selector) {
    throw new Error('❌ waitAndFindElement called with undefined selector');
  }

  const element = selector.elementId ? selector : await $(selector);
  await element.waitForExist({ timeout });
  return element;
}

export async function waitAndClick(selector, timeout = 15000) {
  if (!selector) {
    throw new Error('❌ waitAndClick called with undefined selector');
  }

  const el = await waitAndFindElement(selector, timeout);
  await el.waitForDisplayed({ timeout });
  await el.click();
}

export async function setValueFast(selector, value) {
  const el = await waitAndFindElement(selector);
  await el.setValue(value);
}

export async function clickAndType(selector, value) {
  const el = await waitAndFindElement(selector);
  await el.click();
  await driver.keys(value);
}

/* ================= SYSTEM PERMISSIONS ================= */

export async function handleSystemPermissions(timeout = 3000) {
  const permissionButtons = [
    'id=com.android.permissioncontroller:id/permission_allow_button',
    'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button',
    'id=com.android.permissioncontroller:id/permission_allow_one_time_button',
    'id=android:id/button1',
    'id=android:id/button2'
  ];

  const endTime = Date.now() + timeout;

  while (Date.now() < endTime) {
    let handled = false;

    for (const selector of permissionButtons) {
      const el = await $(selector);
      if (await el.isDisplayed()) {
        await el.click();
        handled = true;
        await driver.pause(500); // allow next dialog to appear
        break;
      }
    }

    // if no permission found in this loop, wait and retry
    if (!handled) {
      await driver.pause(300);
    }
  }
}

export async function waitForElementVisible(selector, timeout = 15000) {
  const el = await waitAndFindElement(selector, timeout);
  await el.waitForDisplayed({ timeout });
  return el;
}


export async function swipeScreen(startY = 0.8, endY = 0.2) {
  const { width, height } = await driver.getWindowRect();
  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: width / 2, y: height * startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 500 },
        { type: 'pointerMove', duration: 800, x: width / 2, y: height * endY },
        { type: 'pointerUp', button: 0 }
      ]
    }
  ]);
  await driver.releaseActions();
}
