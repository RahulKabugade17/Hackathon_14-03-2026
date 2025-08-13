
# Appium Mobile Automation Starter

A clean, scalable, and maintainable mobile automation framework built using Appium, WebdriverIO, and Cucumber BDD, featuring structured folder hierarchy, reusable components, Allure reporting, cross-platform support (Android & iOS), tag-based test execution, and easy CI/CD integration.

---

## 🚀 **Key Features**

* 📂 **Modular Folder Structure**: Organizes tests, configs, and reports cleanly for mobile platforms.
* ✅ **BDD with Cucumber**: Write test scenarios using Gherkin for easy understanding.
* 📊 **Allure Reporting**: Visual test reports with screenshots and video recordings.
* 📱 **Cross-Platform Support**: Test Android and iOS apps with unified code.
* 🏷️ **Tag-Based Execution**: Easily run tests like `@smoke`, `@regression`.
* 🔄 **CI/CD Ready**: GitHub Actions support included for automation pipelines.

---

## 📂 **Directory Structure**

```plaintext
appium-mobile-starter/
├── .git/                    # Git repository metadata
├── .idea/                   # IDE-specific settings
│   └── vcs.xml
├── apps/                    # Mobile app binaries
│   ├── iosApp.app           # iOS app file
│   └── androidApp.apk       # Android app file
├── src/                     # Source files
│   ├── config/              # Device and capability configurations
│   │   ├── wdio.android.config.js
│   │   ├── wdio.base.config.js
│   │   └── wdio.ios.config.js
│   ├── features/            # Cucumber feature files (Gherkin)
│   │   └── Login.feature
│   ├── pages/               # Page Object Model (POM) files
│   │   ├── home.js
│   │   └── login.js
│   ├── stepDefinitions/     # Step definitions for BDD tests
│   │   └── loginStepDefinitions.js
│   └── utils/               # Reusable utility functions
│       ├── CustomCommands.js
│       └── Gestures.js
├── .gitignore               # Files and folders to be ignored by Git
├── package.json             # Node.js dependencies and scripts
├── regression.yml           # CI workflow or regression suite config
└── README.md                # Project documentation

```

---

## 🛠️ **Tech Stack**

* **Framework**: Appium + WebdriverIO
* **BDD Support**: Cucumber + Gherkin
* **Reporting**: Allure
* **Platform Support**: Android & iOS
* **CI/CD**: GitHub Actions

---

## 🔧 **Setup & Installation**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/appium-mobile-starter.git
   cd appium-mobile-starter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Appium**

   ```bash
   npm install -g appium
   appium driver install uiautomator2   # For Android
   appium driver install xcuitest       # For iOS
   ```

4. **Install Appium Inspector**
   [Download from here](https://github.com/appium/appium-inspector/releases)

---

## 🚀 **Running Tests**

### Android

```bash
npm run android
```

### iOS (macOS only)

```bash
npm run ios
```

---

## 🏷️ **Tagging Tests**

* Add tags to your feature or scenario (e.g., `@smoke`, `@regression`).
* Run tests with specific tags using CLI:

  ```bash
  TAGS="@regression" npm run android
  ```

---

## 📊 **Reporting**

* Generate Allure Reports:

  ```bash
  npm run report
  ```

* Includes:

  * Step-wise execution logs
  * Screenshots for failures
  * Video recordings (if configured)

---

## 🔄 **CI/CD Integration**

Sample GitHub Actions workflow for automated test execution:

```yaml
name: Appium Tests

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  appium-run:
    runs-on: macos-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm install

      - name: Run Android tests
        run: npm run android
```

---

## 🤝 **Contributing**

We welcome your contributions!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.
   

---

## 👨‍💻 **Author**

**Kombee Technologies**

* 🌐 [Portfolio](https://github.com/kombee-technologies)
* 💼 [LinkedIn](https://in.linkedin.com/company/kombee-global)
* 🌍 [Website](https://www.kombee.com/)

---

<p align="center">
  Built with ❤️ using Appium
</p>

