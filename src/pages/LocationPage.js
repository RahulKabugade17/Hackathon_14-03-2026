import { waitAndClick } from '../utils/CustomCommands.js';

class LocationPage {
    selectors = {
        stateDropdown: {
            droid: '~~location-state-dropdown',
            ios: ''
        },
        stateOption: {
            droid: '~~dropdown-item-Andhra Pradesh',
            ios: ''
        },
        areaDropdown: {
            droid: '~~location-area-dropdown',
            ios: ''
        },
        areaOption: {
            droid: '~~dropdown-item-Anantapur',
            ios: ''
        },
        districtDropdown: {
            droid: '~~location-district-dropdown',
            ios: ''
        },
        districtOption: {
            droid: '~~dropdown-item-Anantapur',
            ios: ''
        },
        pincodeDropdown: {
            droid: '~~location-pincode-dropdown',
            ios: ''
        },
        pincodeOption: {
            droid: '~~dropdown-item-515001',
            ios: ''
        },
        nextButton: {
            droid: '~~location-next-button',
            ios: ''
        },
        confirmButton: {
            droid: '~~confirm-location-confirm-button',
            ios: ''
        }
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
    }
}

export default new LocationPage();
