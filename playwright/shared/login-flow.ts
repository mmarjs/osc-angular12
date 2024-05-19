import { Page } from '@playwright/test';
import { DashboardPage } from '../page/dashboard.po';
import { HomePage } from '../page/home.po';
import { LoginPage } from '../page/login.po';

export async function loginMe(
  page: Page,
  account: string,
  password: string,
) {
  const homePage = new HomePage(page);
  await homePage.clickLoginBtn();

  const loginPage = new LoginPage(page);
  await loginPage.inputEmail(account);
  await loginPage.inputPassword(password);
  await loginPage.clickLoginBtn();

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.verifyDashBoardPage();
}
