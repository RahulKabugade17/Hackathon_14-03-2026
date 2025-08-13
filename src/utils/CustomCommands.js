const platformKeyMap = {
  android: 'droid',
  ios: 'ios',
};

browser.overwriteCommand('$', async ($, selector) => {
  let element = undefined;
  if (typeof selector === 'string') {
    element = await $(selector);
  } else {
    element = await $(getSelectorByPlatform(selector));
  }
  return element;
});

browser.overwriteCommand('$$', async ($$, selector) => {
  let element = undefined;
  if (typeof selector === 'string') {
    element = await $$(selector);
  } else {
    element = await $$(getSelectorByPlatform(selector));
  }
  return element;
});

/**
 * Gets platform specfic selector.
 * @param {*} selector
 * @return {string} Platform specific selector.
 */
function getSelectorByPlatform(selector) {
  const platform = getPlatform();
  const platformKey = validateAndGetPlatformKey(platform);
  return selector[platformKey];
}

/**
 * Gets current platform.
 * @return {string} platform
 */
function getPlatform() {
  if (!driver.isMobile) return 'web';
  return driver.isIOS ? 'ios' : 'android';
}

/**
 * Checks if platform specific selector set.
 * @param {string} platform
 * @return {string} key
 */
function validateAndGetPlatformKey(platform) {
  const platformKey = platformKeyMap[platform];
  if (!platformKey) {
    throw new Error(`Selector not set for ${platform} platform.`);
  }
  return platformKey;
}
