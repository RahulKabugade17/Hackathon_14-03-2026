/* =====================================================
   PLATFORM RESOLUTION
===================================================== */

const platformKeyMap = {
  android: "droid",
  ios: "ios",
};

/* =====================================================
   OVERWRITE $
===================================================== */

browser.overwriteCommand("$", async (original$, selector) => {
  if (!selector) {
    throw new Error("❌ $ called with undefined selector");
  }

  if (selector?.elementId) return selector;

  if (typeof selector === "string") {
    return original$(selector);
  }

  if (selector?.droid || selector?.ios) {
    const resolved = getSelectorByPlatform(selector);

    if (Array.isArray(resolved)) {
      for (const sel of resolved) {
        try {
          const el = await original$(sel);
          if (await el.isExisting()) return el;
        } catch {}
      }
      throw new Error(
        `[SELECTOR ERROR] None matched: ${JSON.stringify(resolved)}`,
      );
    }

    return original$(resolved);
  }

  throw new Error(
    `[SELECTOR ERROR] Invalid selector: ${JSON.stringify(selector)}`,
  );
});

/* =====================================================
   OVERWRITE $$
===================================================== */

browser.overwriteCommand("$$", async (original$$, selector) => {
  if (!selector) {
    throw new Error("❌ $$ called with undefined selector");
  }

  if (typeof selector === "string") return original$$(selector);

  if (selector?.droid || selector?.ios) {
    return original$$(getSelectorByPlatform(selector));
  }

  throw new Error(
    `[SELECTOR ERROR] Invalid selector: ${JSON.stringify(selector)}`,
  );
});

/* =====================================================
   PLATFORM HELPERS
===================================================== */

function getSelectorByPlatform(selector) {
  const platform = getPlatform();
  const key = platformKeyMap[platform];

  if (!key || !selector[key]) {
    throw new Error(`Selector not set for ${platform}`);
  }

  return selector[key];
}

function getPlatform() {
  if (!driver.isMobile) return "web";
  return driver.isIOS ? "ios" : "android";
}

/* =====================================================
   COMMON ACTIONS
===================================================== */

export async function waitAndFindElement(selector, timeout = 30000) {
  if (!selector) {
    throw new Error("❌ waitAndFindElement called with undefined selector");
  }

  const el = selector?.elementId ? selector : await $(selector);
  await el.waitForExist({ timeout });
  await el.waitForDisplayed({ timeout });

  return el;
}

export async function waitForElementVisible(selector, timeout = 5000) {
  return waitAndFindElement(selector, timeout);
}
export async function waitForVisible(selector, timeout = 5000) {
  return waitAndFindElement(selector, timeout);
}

export async function waitAndClick(selector, timeout = 30000) {
  const el = await waitAndFindElement(selector, timeout);
  try {
    await el.click();
  } catch (err) {
    console.warn("Retry click due to failure:", err.message);
    await driver.pause(300);
    await el.click();
  }
}

export async function clickIfPresent(selector, timeout = 2000) {
  try {
    const el = await $(selector);
    if (await el.waitForDisplayed({ timeout })) {
      await el.click();
      return true;
    }
  } catch {}
  return false;
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

/* =====================================================
   SYSTEM PERMISSIONS
===================================================== */

export async function handleSystemPermissions(timeout = 7000) {
  const permissionButtons = [
    "id=com.android.permissioncontroller:id/permission_allow_button",
    "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button",
    "id=com.android.permissioncontroller:id/permission_allow_one_time_button",
    'android=new UiSelector().textContains("Allow")',
    "id=android:id/button1",
  ];

  const endTime = Date.now() + timeout;

  while (Date.now() < endTime) {
    let clicked = false;

    for (const selector of permissionButtons) {
      try {
        const el = await $(selector);
        if ((await el.isExisting()) && (await el.isDisplayed())) {
          await el.click();
          await driver.pause(800);
          clicked = true;
          break;
        }
      } catch {}
    }

    if (!clicked) {
      await driver.pause(500);
    }
  }
}

/* =====================================================
   EXTRA UTILITIES (FROM FILE 1)
===================================================== */

export async function swipeScreen(startY = 0.8, endY = 0.2) {
  const { width, height } = await driver.getWindowRect();

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: width / 2, y: height * startY },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 500 },
        { type: "pointerMove", duration: 800, x: width / 2, y: height * endY },
        { type: "pointerUp", button: 0 },
      ],
    },
  ]);

  await driver.releaseActions();
}

export async function closeWebViewPopup() {
  try {
    const contexts = await driver.getContexts();
    const webview = contexts.find((c) => c.includes("WEBVIEW"));

    if (!webview) return;

    await driver.switchContext(webview);

    const closeBtn = await $("span");
    if (await closeBtn.isDisplayed()) {
      await closeBtn.click();
    }

    await driver.switchContext("NATIVE_APP");
  } catch (e) {
    console.warn(`WebView popup handling failed: ${e.message}`);
    try {
      await driver.switchContext("NATIVE_APP");
    } catch {}
  }
}
