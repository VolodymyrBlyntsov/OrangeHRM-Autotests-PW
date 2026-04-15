import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { createEmployeeComponent } from "./components/employee/createEmployeeComponent";

export class EmployeePage extends BasePage {
    readonly employee: createEmployeeComponent
    protected readonly searchNameField: Locator;
    protected readonly searchButton: Locator;
    protected readonly recordFoundToggle: Locator;
    protected readonly recordDeleteButton: Locator;
    protected readonly confirmDeletePopup: Locator;
    protected readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.employee = new createEmployeeComponent(page);
        this.searchNameField = page.getByRole('textbox', { name: "Type for hints..."}).nth(0);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordFoundToggle = page.locator("label:has(input[type='checkbox'][value='0'])");
        this.recordDeleteButton = page.locator("//button[normalize-space(.)='Delete Selected']");
        this.confirmDeletePopup = page.locator("//div[@role='document']");
        this.confirmDeleteButton = page.locator("//button[normalize-space(.)='Yes, Delete']");
    }

    getRecordFirstName(firstName: string): Locator {
        return this.page.getByRole('cell', { name: firstName });
    }

    getRecordLastName(lastName: string): Locator {
        return this.page.getByRole('cell', { name: lastName });
    }

    async searchEmployee(name: string) {
        await this.searchNameField.fill(name);
        await this.searchButton.click();
    }

    async expectEmployeeInResults(firstName: string, lastName: string) {
        await expect(this.getRecordFirstName(firstName)).toBeVisible();
        await expect(this.getRecordLastName(lastName)).toBeVisible();
    }

    async deleteEmployeeRecord() {
        await this.recordFoundToggle.check({ force: true });
        await this.recordDeleteButton.click();

        await expect(this.confirmDeletePopup).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.confirmDeletePopup).not.toBeVisible();
    }

    async deleteEmployee(name: string) {
        await this.searchEmployee(name);
        await this.deleteEmployeeRecord();
    }
}