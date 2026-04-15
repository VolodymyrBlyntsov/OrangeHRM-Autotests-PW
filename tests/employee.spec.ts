import { test } from "../fixtures/login/loginFixture";
import { employeeData } from "../data/employee-data";
import { EmployeePage } from "../pages/EmployeePage";

test('C5: Create a new employee (positive)', async ({page}) => {
    const employeePage = new EmployeePage(page);
    await employeePage.open('/web/index.php/pim/addEmployee');
    await employeePage.employee.createEmployee(employeeData);
    await employeePage.employee.submit();

    await page.waitForTimeout(5000);

    // видалення
    await employeePage.open('/web/index.php/pim/viewEmployeeList');
    await employeePage.deleteEmployee(employeeData.lastName);
})