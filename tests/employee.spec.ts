import { test } from "../fixtures/login/loginFixture";
import { employeeData } from "../data/employee-data";
import { loginData } from "../data/login-data";
import { EmployeePage } from "../pages/EmployeePage";

test('C5: Create a new employee (positive)', async ({page, login}) => {
    login.form.performLogin(loginData.username, loginData.password);
    
    await page.waitForLoadState('networkidle');

    const employeePage = new EmployeePage(page);
    await employeePage.open('/web/index.php/pim/addEmployee');
    await employeePage.employee.createEmployee(employeeData);
    await employeePage.employee.submit();

    await page.waitForTimeout(5000);
})