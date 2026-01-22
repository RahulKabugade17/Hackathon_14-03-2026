const platformKeyMap = {
  android: 'droid',
  ios: 'ios'
};

browser.overwriteCommand('$', async ($, selector) => {
  if (selector?.elementId) {
    return selector;
  }
  if (typeof selector === 'string') {
    return $(selector);
  }
  if (selector?.droid || selector?.ios) {
    return $(getSelectorByPlatform(selector));
  }
  throw new Error(`[SELECTOR ERROR] Invalid selector passed to $(): ${JSON.stringify(selector)}`);
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
  const element = selector?.elementId ? selector : await $(selector);
  await element.waitForExist({ timeout });
  return element;
}

export async function waitAndClick(selector, timeout = 15000) {
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

export async function handleSystemPermissions() {
  const permissionButtons = [
    'com.android.permissioncontroller:id/permission_allow_button',
    'com.android.permissioncontroller:id/permission_allow_foreground_only_button',
    'com.android.permissioncontroller:id/permission_allow_one_time_button',
    'android:id/button1',
    'android:id/button2'
  ];
  for (let i = 0; i < 5; i++) {
    for (const id of permissionButtons) {
      try {
        const el = await $(`id=${id}`);
        if (await el.isDisplayed()) {
          await el.click();
          await driver.pause(500);
        }
      } catch { }
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
