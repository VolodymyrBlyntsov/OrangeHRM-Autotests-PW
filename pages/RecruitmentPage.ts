import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { addVacancyComponent } from "./components/recruitment/addVacancyComponent";


export class RecruitmentPage extends BasePage {
    readonly addVacancy: addVacancyComponent;

    constructor(page: Page) {
        super(page);
        this.addVacancy = new addVacancyComponent(page);
    }

    await this.page.open()
}