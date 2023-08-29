import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import AddressesPage from '../pages/addresses.page';

test.describe.serial('Login and add an address ', () => {
    let homePage: HomePage;
    let addressesPage: AddressesPage;
    test('Login And Add Address', async ({ page }) => {
        homePage = new HomePage(page);
        addressesPage = new AddressesPage(page);

        await homePage.navigateToHomePage();
        await homePage.login();
        await addressesPage.openAddressesPage();
        await addressesPage.submitAddressForm('Germany', 'Test Demirtag', '+49 821 9078520',
            'Curt-Frenzel-Straße', '10', '86167', 'Augsburg')
    })

    test('Login and Edit an Address', async ({ page }) => {
        homePage = new HomePage(page);
        addressesPage = new AddressesPage(page);

        await homePage.navigateToHomePage();
        await homePage.login();
        await addressesPage.openAddressesPage();
        await addressesPage.editAddress();


    })
})   