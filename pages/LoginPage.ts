import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    protected readonly username: Locator;
    protected readonly password: Locator;
    protected readonly loginButton: Locator;
    readonly errorMessageIncorrectLogin: Locator;
    readonly errorMessageForEmptyField: Locator;

    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageIncorrectLogin = page.locator('//p[text()="Invalid credentials"]');
        this.errorMessageForEmptyField = page.locator('//span[text()="Required"]');
    }

    async fillAuthFields(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async fillAuthFieldsWithIncorrectData(username: string, incorrectPassword: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(incorrectPassword);
        await this.loginButton.click();
    }

    async fillAuthFieldsWithEmptyData(username: string): Promise<void> {
        await this.username.fill(username);
        await this.loginButton.click();
    }
}