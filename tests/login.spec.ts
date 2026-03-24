import { test } from '@playwright/test';
import { loginData } from '../data/login-data';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authorization to HRM', () => {

  let login: LoginPage;

  test.beforeEach(async ({page}) => {
    login = new LoginPage(page);
    
    await login.open('/web/index.php/auth/login');
  });

  test('C1: Login with correct credentials', async () => {
    await login.form.login(loginData.username, loginData.password);
    await login.form.checkSuccessfulLogin();
  });

  test('C2: Login with incorrect credentials', async () => {
    await login.form.login(loginData.username, loginData.incorrectPassword);
    await login.error.expectInvalidCredential();
  })

  test('C3: Login with one empty field', async () => {
    await login.form.login(loginData.username);
    await login.error.expectEmptyCredential();
  })
})