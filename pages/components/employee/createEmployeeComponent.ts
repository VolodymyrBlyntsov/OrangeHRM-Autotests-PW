import { Locator, Page } from "@playwright/test";

interface employeeData {
    userPic: string 
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export class createEmployeeComponent {
    private readonly page: Page
    readonly userProfileImage: Locator;
    private readonly firstName: Locator;
    private readonly lastName:  Locator;
    readonly loginDetailToggle:  Locator;
    private readonly username:  Locator;
    private readonly password:  Locator;
    private readonly confirmPassword:  Locator;
    private readonly saveButton:  Locator;

    constructor(page: Page) {
        this.page = page;
        this.userProfileImage = page.locator('input.oxd-file-input');
        this.firstName = page.getByRole("textbox", { name: 'First Name'});
        this.lastName = page.getByRole("textbox", { name: "Last Name" });
        this.loginDetailToggle = page.locator('.oxd-switch-input');
        this.username = page.locator('(//input[contains(@class, "oxd-input--active")])[6]');
        this.password = page.locator('(//input[contains(@class, "oxd-input--active")])[7]');
        this.confirmPassword = page.locator('(//input[contains(@class, "oxd-input--active")])[8]');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async uploadProfilePage(filePath: string) {
        await this.userProfileImage.setInputFiles(filePath);
    }

    async fillFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }
    
    async fillLastName(lastName: string) { 
        await this.lastName.fill(lastName);
    }

    async fillLoginDetails(username: string, password: string) {
        const isCreateLoginDetailsChecked = await this.loginDetailToggle.isChecked();
        if (!isCreateLoginDetailsChecked) {
            await this.loginDetailToggle.click();
        }
        await this.username.fill(username);
        await this.page.keyboard.press('Tab');
        await this.password.fill(password);
        await this.page.keyboard.press('Tab');
        await this.confirmPassword.fill(password);
    }

    async submit() {
        await this.saveButton.click();
    }

    async createEmployee(data: employeeData) {
        await this.uploadProfilePage(data.userPic);
        await this.fillFirstName(data.firstName);
        await this.fillLastName(data.lastName);
        await this.fillLoginDetails(data.username, data.password)
    }
}