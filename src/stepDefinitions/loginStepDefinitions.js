import { When, Then } from '@cucumber/cucumber';
import LoginPage from '../pages/login';
import loginData from '../data/login.example.json';
const loginPage = new LoginPage();
When('user enters mobile and requests OTP', async function () {
    await loginPage.enterMobile(loginData.mobile);
});

When('submits otp', async function () {
    await loginPage.submitOtp(loginData.otp);
});

Then('user is logged in', async function () {
    await loginPage.assertLoggedIn();
});