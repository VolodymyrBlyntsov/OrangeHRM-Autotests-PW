import { test } from '../fixtures/login/loginFixture';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { vacancyData } from '../data/vacancy-data';
import { loginData } from '../data/login-data';

test('C4: Add vacancy from Recruitment Service (positive)', async ({page, login}) => {
    login.form.performLogin(loginData.username, loginData.password);

    await page.waitForLoadState('load');

    const recruitmentPage = new RecruitmentPage(page);
    await recruitmentPage.open('/web/index.php/recruitment/addJobVacancy')
    await recruitmentPage.addVacancy.fillVacancy(
        vacancyData.vacancyName,
        vacancyData.jobTitle,
        vacancyData.vacancyDesc,
        vacancyData.numberOfPosition,
        vacancyData.hiringManager
        );
    })