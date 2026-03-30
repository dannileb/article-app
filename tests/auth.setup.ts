import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('NavBar.LoginButton').click();
    await page.getByTestId('LoginForm.Username').fill('user');
    await page.getByTestId('LoginForm.Password').fill('123');
    await page.getByTestId('LoginForm.LoginButton').click();

    await expect(page.getByTestId('NavBar.LogoutButton')).toBeVisible();

    await page.context().storageState({ path: authFile });
});
