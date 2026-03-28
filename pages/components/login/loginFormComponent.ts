import { Locator, Page, expect } from "@playwright/test";

export class loginFormComponent {
    protected readonly username: Locator;
    protected readonly password: Locator;
    protected readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async fillUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }

    async fillPassword(password?: string): Promise<void> {
       if (password !== undefined) {
        await this.password.fill(password);
       }
    }

    async submit() {
        await this.loginButton.click();
    }

    async performLogin(username: string, password?: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password)
        await this.submit();
    }

    async checkSuccessfulLogin() {
        await expect(this.page).toHaveURL('/web/index.php/dashboard/index')
    }
}