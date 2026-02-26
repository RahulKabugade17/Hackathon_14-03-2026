/* =====================================================
   PLATFORM RESOLUTION
===================================================== */

const platformKeyMap = {
  android: 'droid',
  ios: 'ios'
};
export async function waitForVisible(selector, timeout = 5000) {
  return waitAndFindElement(selector, timeout);
}
/* =====================================================
   OVERWRITE $
===================================================== */
browser.overwriteCommand('$', async (original$, selector) => {
  if (!selector) {
    throw new Error('❌ $ called with undefined selector');
  }

  // Already WebdriverIO element
  if (selector?.elementId) {
    return selector;
  }

  // Plain string selector
  if (typeof selector === 'string') {
    return original$(selector);
  }

  // Platform-based selector object
  if (selector?.droid || selector?.ios) {
    const resolved = getSelectorByPlatform(selector);

    // ✅ ARRAY fallback support
    if (Array.isArray(resolved)) {
      for (const sel of resolved) {
        try {
          const el = await original$(sel);
          if (await el.isExisting()) {
            return el;
          }
        } catch {
          // ignore and try next
        }
      }

      throw new Error(
        `[SELECTOR ERROR] None of the selectors matched: ${JSON.stringify(resolved)}`
      );
    }

    return original$(resolved);
  }

  throw new Error(
    `[SELECTOR ERROR] Invalid selector passed to $(): ${JSON.stringify(selector)}`
  );
});

/* =====================================================
   OVERWRITE $$
===================================================== */

browser.overwriteCommand('$$', async (original$$, selector) => {
  if (!selector) {
    throw new Error('❌ $$ called with undefined selector');
  }

  if (typeof selector === 'string') {
    return original$$(selector);
  }

  if (selector?.droid || selector?.ios) {
    return original$$(getSelectorByPlatform(selector));
  }

  throw new Error(
    `[SELECTOR ERROR] Invalid selector passed to $$(): ${JSON.stringify(selector)}`
  );
});

/* =====================================================
   PLATFORM HELPERS
===================================================== */

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

/* =====================================================
   COMMON ACTIONS
===================================================== */

export async function waitAndFindElement(selector, timeout = 15000) {
  if (!selector) {
    throw new Error('❌ waitAndFindElement called with undefined selector');
  }

  const element = selector?.elementId ? selector : await $(selector);

  await element.waitForExist({ timeout });
  await element.waitForDisplayed({ timeout });

  return element;
}

export async function waitForElementVisible(selector, timeout = 15000) {
  return waitAndFindElement(selector, timeout);
}

export async function waitAndClick(selector, timeout = 15000) {
  const el = await waitAndFindElement(selector, timeout);
  try {
    await el.click();
  } catch (err) {
    await driver.pause(300);
    await el.click();
  }
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

export async function clickIfPresent(selector, timeout = 2000) {
  try {
    const el = await $(selector);
    if (await el.waitForDisplayed({ timeout })) {
      await el.click();
    }
  } catch {
    // Element not present — ignore safely
  }
}

/* =====================================================
   SYSTEM PERMISSIONS (ANDROID)
===================================================== */

export async function handleSystemPermissions(timeout = 5000) {
  const permissionButtons = [
    'id=com.android.permissioncontroller:id/permission_allow_button',
    'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button',
    'id=com.android.permissioncontroller:id/permission_allow_one_time_button',
    'id=android:id/button1',
    'id=android:id/button2'
  ];

  const endTime = Date.now() + timeout;
  let anyHandled = false;
  while (Date.now() < endTime) {
    let handledThisRound = false;
    for (const selector of permissionButtons) {
      try {
        const el = await $(selector);
        if (await el.isDisplayed()) {
          await el.click();
          anyHandled = true;
          handledThisRound = true;
          await driver.pause(600);
          break;
        }
      } catch { }
    }
    if (!handledThisRound && !anyHandled) {
      break;
    }
    if (!handledThisRound) {
      await driver.pause(300);
    }
  }
}

/* =====================================================
   SWIPE UTILITY
===================================================== */

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