import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

type TLogin = {
    login: LoginPage
}

export const test = base.extend<TLogin>({
    login: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        loginPage.open('/web/index.php/auth/login');
        use(loginPage);
    }
})

