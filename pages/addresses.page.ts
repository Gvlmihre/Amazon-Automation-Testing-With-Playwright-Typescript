import { Locator, Page, expect } from "@playwright/test";

class AddressesPage {
    yourAccountBtn: Locator;
    yourAccountPageVerificationMessage: Locator;
    yourAddressesBtn: Locator;
    addressesPageVerificationMessage: Locator;
    page: Page;
    signinSection: Locator;
    addAddressSection: Locator;
    addAddressVerificationMessage: Locator;
    countryDdmenu: Locator;
    fullNameField: Locator;
    phoneNumberField: Locator;
    addressLine2: Locator;
    postalCodeField: Locator;
    townOrCityField: Locator;
    addAddressBtn: Locator;
    addressLine1: Locator;
    skipForNowRadioBtn: Locator;
    continueBtn: Locator;
    addressSavedVerificationMessage: Locator;
    editAddressBtn: Locator;
    setAsDefaultAddressBtn: Locator;
    saveChangesBtn: Locator;
    removeAddressBtn: Locator;
    removeAddressConfirmationMessage: Locator;
    addressRemovedVerificationMessage: Locator;

    constructor(page: Page) {
        this.signinSection = page.locator('text=Account & Lists');
        this.yourAccountBtn = page.locator('#nav-al-your-account > a:nth-child(2) > span');
        this.yourAccountPageVerificationMessage = page.locator('#a-page > div.a-container > div > div.a-row.a-spacing-base > h1');
        this.yourAddressesBtn = page.locator('text=Your Addresses');
        this.addressesPageVerificationMessage = page.locator('#a-page > div.a-section > div > h1');
        this.addAddressSection = page.locator('#ya-myab-plus-address-icon');
        this.addAddressVerificationMessage = page.locator('#a-page > div.a-section > div > div:nth-child(2) > h2');
        this.countryDdmenu = page.locator('#address-ui-widgets-countryCode-dropdown-nativeId');
        this.fullNameField = page.locator('#address-ui-widgets-enterAddressFullName');
        this.phoneNumberField = page.locator('#address-ui-widgets-enterAddressPhoneNumber');
        this.addressLine2 = page.locator('#address-ui-widgets-enterAddressLine2');
        this.addressLine1 = page.locator('#address-ui-widgets-enterAddressLine1')
        this.postalCodeField = page.locator('#address-ui-widgets-enterAddressPostalCode');
        this.townOrCityField = page.locator('#address-ui-widgets-enterAddressCity');
        this.addAddressBtn = page.locator('#address-ui-widgets-form-submit-button > span > input');
        this.skipForNowRadioBtn = page.locator('#kyc-xborder-radio-skip');
        this.continueBtn = page.locator('#kyc-xborder-continue-button > span > input')
        this.addressSavedVerificationMessage = page.locator('#yaab-alert-box > div > h4');
        this.editAddressBtn = page.locator('#ya-myab-address-edit-btn-0');
        this.setAsDefaultAddressBtn = page.locator('#address-ui-widgets-use-as-my-default')
        this.saveChangesBtn = page.locator('#address-ui-widgets-form-submit-button > span > input')
        this.removeAddressBtn = page.locator('#ya-myab-address-delete-btn-0');
        this.removeAddressConfirmationMessage = page.locator('text=Yes')
        this.addressRemovedVerificationMessage = page.locator('#yaab-alert-box > div')
    }

    async openAddressesPage() {
        await this.signinSection.hover({ force: true });
        await this.yourAccountBtn.click();
        console.log('clicked on the your account botton successfully!');
        await expect(this.yourAccountPageVerificationMessage).toHaveText('Your Account');
        console.log('opened your account page successfully!');
        await this.yourAddressesBtn.click();
        console.log('Clicked on your addresses botton successfully!');
        await expect(this.addressesPageVerificationMessage).toHaveText('Your Addresses');
        console.log('Your addresses page opened successfully!')
    }

    async submitAddressForm(country: string, fullName: string, phoneNumber: string,
        addressLine2: string, addressLine1: string, postalCode: string, townOrCity: string) {

        await this.addAddressSection.click();
        await expect(this.addAddressVerificationMessage).toHaveText('Add a new address')

        console.log('started to fill in the address form:')
        await this.countryDdmenu.selectOption(country);

        await this.fullNameField.click();
        await this.fullNameField.clear();
        await this.fullNameField.fill(fullName);
        await this.phoneNumberField.fill(phoneNumber);
        await this.addressLine2.fill(addressLine2);
        await this.addressLine1.fill(addressLine1);

        await this.postalCodeField.clear();
        await this.postalCodeField.fill(postalCode);

        await this.townOrCityField.fill(townOrCity);
        await this.addAddressBtn.click();
        console.log('filled addresses form!')

        await expect(this.addressSavedVerificationMessage).toHaveText('Address saved')
        console.log('Address added successfully!')
    }

    async removeAddress() {
        await this.removeAddressBtn.click();
        await this.removeAddressConfirmationMessage.click();
        await expect(this.addressRemovedVerificationMessage).toHaveText('Address deleted');
    }

    async editAddress() {
        await this.editAddressBtn.click();
        await this.setAsDefaultAddressBtn.check();
        await this.saveChangesBtn.click();
        await expect(this.addressSavedVerificationMessage).toHaveText('Address saved');
        console.log('Address edited successfully!')
    }
}

export default AddressesPage;