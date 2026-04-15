import { test } from '../fixtures/login/loginFixture'
import { loginData } from '../data/login-data';

test.describe('Authorization to HRM', () => {
  test.skip('C1: Login with correct credentials', async ({ login }) => {
    await login.form.performLogin(loginData.username, loginData.password);
    await login.form.checkSuccessfulLogin();
  });

  test.skip('C2: Login with incorrect credentials', async ({ login }) => {
    await login.form.performLogin(loginData.username, loginData.incorrectPassword);
    await login.error.expectInvalidCredential();
  })

  test.skip('C3: Login with one empty field', async ({ login }) => {
    await login.form.performLogin(loginData.username);
    await login.error.expectEmptyCredential();
  })
})