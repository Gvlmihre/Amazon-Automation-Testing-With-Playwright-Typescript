import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage: HomePage;
    test('Open Home Page, login and logout', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.login();
        await homePage.logout();
    })
})
