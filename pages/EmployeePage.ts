import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { createEmployeeComponent } from "./components/employee/createEmployeeComponent";

export class EmployeePage extends BasePage {
    readonly employee: createEmployeeComponent

    constructor(page: Page) {
        super(page);
        this.employee = new createEmployeeComponent(page);
    }
}