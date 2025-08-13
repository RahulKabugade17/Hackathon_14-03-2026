class LoginPage {
    selectors = {
        emailField: {
            droid: '~input-email',
            ios: '~input-email',
        },
        passwordField: {
            droid: '~input-password',
            ios: '~input-password',
        },
        loginButton: {
            droid: '~button-LOGIN',
            ios: '~button-LOGIN',
        },
        successMsg: {
            droid: 'android=new UiSelector().resourceId("android:id/message")',
            ios: '',
        }
    }

    async enterCredentials(email, password) {
        await $(this.selectors.emailField).setValue(email);
        await $(this.selectors.passwordField).setValue(password);
    }

    async clickLoginButton() {
        await $(this.selectors.loginButton).click();
    }

    async getSuccessMsg() {
        return await $(this.selectors.successMsg).getText();
    }
}

export default LoginPage;