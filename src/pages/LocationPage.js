import { waitAndClick } from '../utils/CustomCommands.js';

class LocationPage {
    selectors = {
        stateDropdown: { droid: '~~location-state-dropdown' },
        stateOption: { droid: '~~dropdown-item-Andhra Pradesh' },
        areaDropdown: { droid: '~~location-area-dropdown' },
        areaOption: { droid: '~~dropdown-item-Anantapur' },
        districtDropdown: { droid: '~~location-district-dropdown' },
        districtOption: { droid: '~~dropdown-item-Anantapur' },
        pincodeDropdown: { droid: '~~location-pincode-dropdown' },
        pincodeOption: { droid: '~~dropdown-item-515001' },
        nextButton: { droid: '~~location-next-button' },
        confirmButton: { droid: '~~confirm-location-confirm-button' }
    };

    async selectLocation() {
        await waitAndClick(this.selectors.stateDropdown);
        await waitAndClick(this.selectors.stateOption);
        await waitAndClick(this.selectors.areaDropdown);
        await waitAndClick(this.selectors.areaOption);
        await waitAndClick(this.selectors.districtDropdown);
        await waitAndClick(this.selectors.districtOption);
        await waitAndClick(this.selectors.pincodeDropdown);
        await waitAndClick(this.selectors.pincodeOption);
        await waitAndClick(this.selectors.nextButton);
        await waitAndClick(this.selectors.confirmButton);
        console.log('[HOME] Location selected');
    }
}

export default new LocationPage();
