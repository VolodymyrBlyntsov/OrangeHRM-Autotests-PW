import { expect, Locator, Page } from "@playwright/test";

export class loginErrorHandleComponent {
    readonly errorMessageIncorrectLogin: Locator;
    readonly errorMessageForEmptyField: Locator;

    constructor(private readonly page: Page) {
        this.errorMessageIncorrectLogin = page.locator('//p[text()="Invalid credentials"]');
        this.errorMessageForEmptyField = page.locator('//span[text()="Required"]');
    }

    async expectInvalidCredential() {
        await expect(this.errorMessageIncorrectLogin).toBeVisible();
        await expect(this.errorMessageIncorrectLogin).toContainText('Invalid credentials');
    }

    async expectEmptyCredential() {
        await expect(this.errorMessageForEmptyField).toBeVisible();
        await expect(this.errorMessageForEmptyField).toContainText('Required');
    }
}