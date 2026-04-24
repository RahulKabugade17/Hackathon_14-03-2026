import { waitAndClick } from "../utils/custom-commands.js";
import Gestures from "../utils/gestures.js";

class LocationPage {
  selectors = {
    stateDropdown: { droid: "~~location-state-dropdown", ios: "" },
    areaDropdown: { droid: "~~location-area-dropdown", ios: "" },
    districtDropdown: { droid: "~~location-district-dropdown", ios: "" },
    pincodeDropdown: { droid: "~~location-pincode-dropdown", ios: "" },
    nextButton: { droid: "~~location-next-button", ios: "" },
    confirmButton: { droid: "~~confirm-location-confirm-button", ios: "" },
    useCurrentLocationButton: {
      droid: 'android=new UiSelector().text("Use current location")',
      ios: "",
    },
  };
  getDropdownOption(value) {
    return {
      droid: `~~dropdown-item-${value.trim()}`,
      ios: "",
    };
  }

  async selectLocation(locationData) {
    const flow = [
      { dropdown: this.selectors.stateDropdown, value: locationData.state },
      { dropdown: this.selectors.areaDropdown, value: locationData.area },
      {
        dropdown: this.selectors.districtDropdown,
        value: locationData.district,
      },
      { dropdown: this.selectors.pincodeDropdown, value: locationData.pincode },
    ];
    for (const step of flow) {
      await waitAndClick(step.dropdown);
      await waitAndClick(this.getDropdownOption(step.value));
    }
    await Gestures.swipeScreen("up", 2);
    await waitAndClick(this.selectors.nextButton);
    await waitAndClick(this.selectors.confirmButton);
  }

  async useCurrentLocation() {
    await waitAndClick(this.selectors.useCurrentLocationButton);
    await waitAndClick(this.selectors.nextButton);
    await waitAndClick(this.selectors.confirmButton);
  }
}

export default new LocationPage();
