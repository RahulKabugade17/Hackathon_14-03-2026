import { When, Then } from "@wdio/cucumber-framework";
import { handleSystemPermissions } from "../utils/CustomCommands.js";
import { scanCoupon } from "../utils/scanApiClient.js";
import ScanPage from "../pages/ScanPage.js";

When('I redirect to Scan page', async () => {
    await ScanPage.goToScan();
});

When("I allow camera permissions", async () => {
    await handleSystemPermissions();
});

When("I skip scan tooltips", async () => {
    await ScanPage.skipOnboarding();
});

When("I scan coupon {string} via API", async function (qrCode) {
    this.apiScanResult = await scanCoupon({
        token: this.authToken,
        qrCodes: [qrCode],
        latitude: "21.1531533",
        longitude: "72.7752362",
        pincode: "395007"
    });
});

Then("I should validate the scan result for {string}", async function (scenario) {
    if (scenario === "Valid QR Code") {
        expect(this.apiScanResult.status).toEqual(true);
    }
    if (scenario === "Invalid QR Code") {
        expect(this.apiScanResult.message).toContain("Invalid");
    }
    if (scenario === "Already Scanned") {
        expect(this.apiScanResult.message.toLowerCase()).toContain("invalid");
    }
});
