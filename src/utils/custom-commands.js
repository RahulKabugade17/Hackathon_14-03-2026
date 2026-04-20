/* =====================================================
   PLATFORM RESOLUTION
===================================================== */

const platformKeyMap = {
  android: 'droid',
  ios: 'ios'
};
export async function waitForVisible(selector, timeout = 150000) {
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

export async function waitAndFindElement(selector, timeout = 10000) {
  if (!selector) {
    throw new Error('❌ waitAndFindElement called with undefined selector');
  }

  const element = selector?.elementId ? selector : await $(selector);

  await element.waitForExist({ timeout });
  await element.waitForDisplayed({ timeout });

  return element;
}

export async function waitForElementVisible(selector, timeout = 10000) {
  return waitAndFindElement(selector, timeout);
}

export async function waitAndClick(selector, timeout = 10000) {
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

export async function handleSystemPermissions(timeout = 7000) {
  const permissionButtons = [
    'id=com.android.permissioncontroller:id/permission_allow_button',
    'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button',
    'id=com.android.permissioncontroller:id/permission_allow_one_time_button',
    'android=new UiSelector().textContains("Allow")',
    'id=android:id/button1'
  ];

  const endTime = Date.now() + timeout;
  while (Date.now() < endTime) {
    let clicked = false;
    for (const selector of permissionButtons) {
      try {
        const el = await $(selector);
        if (await el.isExisting() && await el.isDisplayed()) {
          await el.click();
          await driver.pause(800);
          clicked = true;
          break;
        }
      } catch (err) {
      }
    }
    if (!clicked) {
      await driver.pause(500);
    }
  }
}