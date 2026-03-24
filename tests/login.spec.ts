import { test, expect } from '@playwright/test';
import { loginPageURL, loginData, dashboardURL } from '../data/login-data';
import { LoginPage } from '../components/LoginPage';

test.describe('Authorization to HRM', () => {

  let login: LoginPage;

  test.beforeEach(async ({page}) => {
    login = new LoginPage(page);
    
    await login.open(loginPageURL)
  });

  test('C1: Login with correct credentials', async ({page}) => {
    login = new LoginPage(page);

    await login.fillAuthFields(loginData.username, loginData.password);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('C2: Login with incorrect credentials', async ({page}) => {
    login = new LoginPage(page);

    await login.fillAuthFieldsWithIncorrectData(loginData.username, loginData.incorrectPassword);
    await expect(login.errorMessageIncorrectLogin).toBeVisible();
    await expect(login.errorMessageIncorrectLogin).toContainText('Invalid credentials');
  })

  test('C3: Login with one empty field', async ({page}) => {
    login = new LoginPage(page);

    await login.fillAuthFieldsWithEmptyData(loginData.username);
    await expect(login.errorMessageForEmptyField).toBeVisible();
    await expect(login.errorMessageForEmptyField).toContainText('Required')
  })
})