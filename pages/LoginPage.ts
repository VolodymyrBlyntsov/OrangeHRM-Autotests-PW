import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { loginFormComponent } from "./components/login/loginFormComponent";
import { loginErrorHandleComponent } from "./components/login/loginErrorHandleComponent";

export class LoginPage extends BasePage {
    readonly form: loginFormComponent;
    readonly error: loginErrorHandleComponent;

    constructor(page: Page) {
        super(page);
        this.form = new loginFormComponent(page);
        this.error = new loginErrorHandleComponent(page);
    }

    async open(path: string) {
        await this.page.goto(path);
    }
}