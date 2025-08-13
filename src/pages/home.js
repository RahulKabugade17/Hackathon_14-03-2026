class HomePage {
    selectors = {
        home: {
            droid: '~Home',
            ios: '//android.view.ViewGroup[@content-desc="button-sign-up-container"]',
        },
        login: {
            droid: '~Login',
            ios: '~Login',
        },
        swipe: {
            droid: '~Swipe'
        }
    }

    async openLogin() {
       await $(this.selectors.login).click();
    }
}

export default HomePage;