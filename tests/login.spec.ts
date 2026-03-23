import { test, expect, Page } from '@playwright/test';
import { loginData } from '../data/login-data';

const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const loginPageElements = (page: Page) => {
  return {
    username: page.getByRole('textbox', { name: 'Username' }),
    password: page.getByRole('textbox', { name: 'Password' }),
    loginButton: page.getByRole('button', { name: 'Login' })
  };
}

test.describe('Authorization to HRM', () => {

  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('C1: Login with correct credentials', async ({page}) => {

    const { username, password, loginButton } = loginPageElements(page);

    await username.fill(loginData.username);
    await password.fill(loginData.password);
    await loginButton.click();

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  });

  test('C2: Login with incorrect credentials', async ({page}) => {

    const { username, password, loginButton } = loginPageElements(page);
    const errorMessageIncorrectLogin = page.locator('//p[text()="Invalid credentials"]');

    await username.fill(loginData.username);
    await password.fill(loginData.incorrectPassword);
    await loginButton.click();

    await expect(errorMessageIncorrectLogin).toBeVisible();
    await expect(errorMessageIncorrectLogin).toContainText('Invalid credentials');
  })

  test('C3: Login with one empty field', async ({page}) => {
   const { username, loginButton } = loginPageElements(page);
    const errorMessageForEmptyField = page.locator('//span[text()="Required"]');

    await username.fill(loginData.username);
    await loginButton.click();

    await expect(errorMessageForEmptyField).toBeVisible();
  })
})