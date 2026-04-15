import { test } from '../fixtures/login/loginFixture';
import { loginData } from '../data/login-data';

test('Setup login authentication session', async ({ login, context }) => {
    const cookieFilePath = './auth/user.json';

    await login.form.performLogin(loginData.username, loginData.password);
    await login.form.checkSuccessfulLogin();
    
    await context.storageState({ path: cookieFilePath });
});