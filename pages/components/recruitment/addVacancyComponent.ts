import { expect, Locator, Page } from '@playwright/test'

export class addVacancyComponent {
    private readonly page: Page;
    protected readonly vacancyName: Locator;
    protected readonly jobTitle: Locator;
    protected readonly description: Locator;
    protected readonly hiringManager: Locator;
    protected readonly numberOfPosition: Locator;
    protected readonly status: Locator;
    protected readonly publishRSSFeed: Locator;
    protected readonly saveVacancyButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.vacancyName = page.locator('(//input[contains(@class, "oxd-input--active")])[2]');
        this.jobTitle = page.locator('//div[contains(@class, "oxd-select-text--active")]');
        this.description = page.getByRole('textbox', { name: 'Type description here' });
        this.hiringManager = page.getByRole('textbox', { name: 'Type for hints...' });
        this.numberOfPosition = page.locator('(//input[contains(@class, "oxd-input--active")])[3]');
        this.status = page.locator('div.oxd-switch-wrapper input[type="checkbox"]').nth(1);
        this.publishRSSFeed = page.locator('div.oxd-switch-wrapper input[type="checkbox"]').nth(2);
        this.saveVacancyButton = page.getByRole('button', { name: 'Save' })
    }

    async fillVacancyName(name: string): Promise<void> {
        await this.vacancyName.fill(name);
    }

    async selectJobTitle(title: string): Promise<void> {
        await this.jobTitle.click();
        const expectedOptionJobTitle = title;
        const expectedOptionJobTitleLocator = this.page.locator(`//div[contains(@role, "option") and contains(text(), "${expectedOptionJobTitle}")]`);
        await expect(expectedOptionJobTitleLocator, "Selector with job titles visible").toBeVisible();

        await expectedOptionJobTitleLocator.click();
        await expect(this.jobTitle).toHaveText(new RegExp(expectedOptionJobTitle));
    }

    async fillVacancyDescription(desc: string): Promise<void> {
        await this.description.fill(desc);
    }
    
    async fillNumberOfPosition(number: string): Promise<void> {
        await this.numberOfPosition.fill(number);
    }
    
    async fillHiringManager(name: string): Promise<void> {
        await this.hiringManager.fill(name);
        await this.hiringManager.press('ArrowDown')
        await this.hiringManager.press('Enter');
    }

    async makeVacancyActive() {
        const isChecked = await this.status.isChecked();

        if(!isChecked) {
            this.status.click();
            await expect(this.status, "Checkbox vacancy status should be active").toBeChecked();
        }
    }

    async disableRSSFeedLinks() {
        const isChecked = await this.publishRSSFeed.isChecked();
        if (isChecked) {
            this.status.click();
            await expect(this.publishRSSFeed, "Checkbox vacancy status should not be active").not.toBeChecked();
        }
    }

    async submit() {
        await this.saveVacancyButton.click();
    }

    async fillVacancy(
        vacancyName: string,
        jobTitle: string,
        vacancyDesc: string,
        numOfPosition: string,
        hiringManagerName: string,
    ) {
        await this.fillVacancyName(vacancyName);
        await this.selectJobTitle(jobTitle);
        await this.fillVacancyDescription(vacancyDesc);
        await this.fillNumberOfPosition(numOfPosition);
        await this.fillHiringManager(hiringManagerName);
        await this.makeVacancyActive();
        await this.disableRSSFeedLinks();
    }
}