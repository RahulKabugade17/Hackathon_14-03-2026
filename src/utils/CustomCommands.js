const platformKeyMap = {
  android: 'droid',
  ios: 'ios',
};

browser.overwriteCommand('$', async ($, selector) => {
  if (typeof selector === 'string') return $(selector);
  return $(getSelectorByPlatform(selector));
});

browser.overwriteCommand('$$', async ($$, selector) => {
  if (typeof selector === 'string') return $$(selector);
  return $$(getSelectorByPlatform(selector));
});

function getSelectorByPlatform(selector) {
  const platform = getPlatform();
  const platformKey = validateAndGetPlatformKey(platform);
  return selector[platformKey];
}

function getPlatform() {
  if (!driver.isMobile) return 'web';
  return driver.isIOS ? 'ios' : 'android';
}

function validateAndGetPlatformKey(platform) {
  const platformKey = platformKeyMap[platform];
  if (!platformKey) {
    throw new Error(`Selector not set for ${platform} platform.`);
  }
  return platformKey;
}

// ==================== SAFE COMMANDS ====================

export async function waitAndFindElement(selector) {
  let element;

  if (typeof selector === 'string') {
    element = await $(selector);
  } else if (selector?.droid || selector?.ios) {
    element = await $(selector.droid || selector.ios);
  } else {
    element = selector;
  }

  await element.waitForExist({ timeout: 90000 });
  await element.waitForDisplayed({ timeout: 90000 });
  return element;
}

export async function waitAndClick(selector) {
  const element = await waitAndFindElement(selector);
  await element.click();
}

export async function waitForElementVisible(selector) {
  const el = await $(selector);
  await el.waitForDisplayed({ timeout: 15000 });
  return el.isDisplayed();
}

// ==================== SYSTEM PERMISSIONS ====================

export async function handleSystemPermissions() {
  const permissionButtons = [
    'com.android.permissioncontroller:id/permission_allow_button',
    'com.android.permissioncontroller:id/permission_allow_foreground_only_button',
    'com.android.permissioncontroller:id/permission_allow_one_time_button',
    'android:id/button1',
    'android:id/button2',
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

// ==================== GESTURES ====================

export async function swipeScreen(startY = 0.8, endY = 0.2) {
  const { width, height } = await driver.getWindowRect();

  await driver.performActions([{
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
  }]);

  await driver.releaseActions();
}
