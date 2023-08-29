import { Locator, Page, expect } from "@playwright/test";

class HomePage {
    page: Page;
    usernameField: Locator;
    signinSection: Locator;
    signinBtn: Locator;
    continueBtn: Locator;
    passwordField: Locator;
    signinSubmitBtn: Locator;
    homePageImage: Locator;
    yourListsSection: Locator;
    yourAccountSection: Locator;
    signoutBtn: Locator;
    signoutVerificationText: Locator;
    languageSection: Locator;
    languageVerificationSection: Locator;
    englishLanguageIcon: Locator;
    yourAccountBtn: Locator;
    yourAccountPageVerificationMessage: Locator;
    yourAddressesBtn: Locator;
    addressesPageVerificationMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.languageSection = page.locator('div#nav-tools > a:nth-child(1) > span')
        this.englishLanguageIcon = page.locator('#nav-flyout-icp > div.nav-template.nav-flyout-content.nav-tpl-itemList > a:nth-child(4) > span > span:nth-child(2)')
        this.languageVerificationSection = page.locator('#icp-nav-flyout > span > span.nav-line-2 > div')
        this.signinSection = page.locator('text=Account & Lists');
        this.yourListsSection = page.locator('#nav-al-title')
        this.yourAccountSection = page.locator('#nav-al-your-account')
        this.signinBtn = page.getByRole('link', { name: 'Sign in', exact: true })
        this.usernameField = page.locator('#ap_email');
        this.continueBtn = page.locator('div.a-section > #continue');
        this.passwordField = page.locator('#ap_password');
        this.signinSubmitBtn = page.locator('#signInSubmit');
        this.signoutBtn = page.locator('#nav-item-signout')
        this.signoutVerificationText = page.locator('h1.a-spacing-small');

    }

    async navigateToHomePage() {
        await this.page.goto('/');
        await this.languageSection.hover();
        await this.englishLanguageIcon.click();
        await expect(this.languageVerificationSection).toHaveText('EN');
        await expect(this.page).toHaveTitle('Amazon.de: Low Prices in Electronics, Books, Sports Equipment & more')
        console.log('Verified the home page opened successfully!');
    }


    async login() {
        await this.signinSection.hover({ force: true });
        await expect(this.yourListsSection).toHaveText('Your Lists');
        await expect(this.yourAccountSection).toContainText('Your Account')
        console.log('opened the your lists and your accounts section successfully!')
        await this.signinSection.hover({ force: true });
        await this.signinBtn.click({ force: true });
        console.log('opened the login page successfully!')
        expect(this.usernameField).toBeVisible;
        await this.usernameField.fill('amazonTestAutomation827@gmail.com');
        await this.continueBtn.click();
        await this.passwordField.fill('testautomation');
        await this.signinSubmitBtn.click();
        await expect(this.signoutBtn).toHaveText('Sign Out')
        console.log('Sign in successfully!')
    }

    async logout() {
        await this.signinSection.hover();
        console.log('opened the your lists and your accounts field successfully!')
        await this.signoutBtn.click();
        await expect(this.signoutVerificationText).toHaveText('Sign in')
        console.log('logged out successfully!')
    }
}

export default HomePage;