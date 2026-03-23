import { test, expect } from '@playwright/test';

test('C1: Login with correct credentials', async ({page}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  //await page.waitForLoadState('load');

  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  await username.fill('Admin');
  await password.fill('admin123');
  await loginButton.click();

  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

test('C2: Login with incorrect credentials', async ({page}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  //await page.waitForLoadState('load');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });
  const errorMessageIncorrectLogin = page.locator('//p[text()="Invalid credentials"]');

  await username.fill('admin');
  await password.fill('password');
  await loginButton.click();

  await expect(errorMessageIncorrectLogin).toBeVisible();
  await expect(errorMessageIncorrectLogin).toContainText('Invalid credentials');
})

test('C3: Login with one empty field', async ({page}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  //await page.waitForLoadState('load');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });
  const errorMessageForEmptyField = page.locator('//span[text()="Required"]');

  await username.fill('Admin');
  await loginButton.click();

  await expect(errorMessageForEmptyField).toBeVisible();
})