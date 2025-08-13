import { Given, When, Then } from "@wdio/cucumber-framework";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

const homePage = new HomePage();
const loginPage = new LoginPage();

Given('The user navigates to Login Screen', async () => {
    await homePage.openLogin();
});

When(/^the user enters "(.*)" and "(.*)"$/, async function(email, password) {
    await loginPage.enterCredentials(email, password);
});

When('clicks on the login button', async () => {
    await loginPage.clickLoginButton();
});

Then('user should be successfully logged in', async() => {
    await expect(await loginPage.getSuccessMsg()).toEqual('You are logged in!');
});