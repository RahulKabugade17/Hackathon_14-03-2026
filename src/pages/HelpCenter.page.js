import { waitAndClick, waitForElementVisible } from '../utils/CustomCommands.js';

class HelpCenterPage {

    selectors = {
        helpCenterEntry: {
            droid: '~help-center-button',
            ios: ''
        },
        callNowButton: {
            droid: '~~helpCenter-callNow-button',
            ios: ''
        },
        faqsButton: {
            droid: '~~helpCenter-faqs-button',
            ios: ''
        },
        viewAllIssuesButton: {
            droid: '~~helpCenter-viewAllIssues-button',
            ios: ''
        },
        raiseTransactionIssueButton: {
            droid: '~~helpCenter-raiseTransactionIssue-button',
            ios: ''
        },
        findMoreHelpButton: {
            droid: '~~helpCenter-findMoreHelp-button',
            ios: ''
        },
        learnMoreButton: {
            droid: '~~helpCenter-learnMore-icon',
            ios: ''
        },
        onboardingNextButton: {
            droid: '~~onboarding-next-button',
            ios: ''
        },
        onboardingSkipButton: {
            droid: '~~onboarding-skip-button',
            ios: ''
        }
    };

    get faqWebView() {
        return $('android=new UiSelector().className("android.webkit.WebView")');
    }


    async navigateToHelpCenter() {
        await waitForElementVisible(this.selectors.helpCenterEntry);
        await waitAndClick(this.selectors.helpCenterEntry);
    }

    async verifyHelpCenterScreenLoaded() {
        await waitForElementVisible(this.selectors.callNowButton);
        await expect($(this.selectors.callNowButton)).toBeDisplayed();
    }

    async verifyAllHelpOptionsVisible() {
        await expect($(this.selectors.callNowButton)).toBeDisplayed();
        await expect($(this.selectors.faqsButton)).toBeDisplayed();
        await expect($(this.selectors.findMoreHelpButton)).toBeDisplayed();
        await expect($(this.selectors.learnMoreButton)).toBeDisplayed();
    }

    async tapCallNow() {
        await waitAndClick(this.selectors.callNowButton);
    }

    async validateDialerOpened() {
        await driver.pause(2000);

        const currentPackage = await driver.getCurrentPackage();
        const allowedDialers = [
            'com.android.dialer',
            'com.google.android.dialer',
            'com.samsung.android.dialer',
            'com.android.server.telecom'
        ];

        const isDialer =
            allowedDialers.includes(currentPackage) ||
            currentPackage.toLowerCase().includes('dialer');

        if (!isDialer) {
            throw new Error(`Expected dialer app, but opened: ${currentPackage}`);
        }
    }

    async returnFromDialer() {
        await driver.back();
        await driver.pause(1000);

        const pkg = await driver.getCurrentPackage();
        if (pkg.toLowerCase().includes('dialer')) {
            await driver.back();
        }

        await waitForElementVisible(this.selectors.callNowButton);
    }

    async tapFAQs() {
        await waitAndClick(this.selectors.faqsButton);
    }

    async verifyFaqScreenOpened() {
        await this.faqWebView.waitForDisplayed({ timeout: 15000 });
        await expect(this.faqWebView).toBeDisplayed();
    }

    async tapFindMoreHelp() {
        await waitAndClick(this.selectors.findMoreHelpButton);
    }

    async tapOnboardingNext() {
        await waitAndClick(this.selectors.onboardingNextButton);
    }

    async tapOnboardingSkip() {
        await waitAndClick(this.selectors.onboardingSkipButton);
    }

    async navigateBack() {
        await driver.back();
    }
}

export default new HelpCenterPage();
