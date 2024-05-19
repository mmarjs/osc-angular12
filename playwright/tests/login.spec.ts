import { BrowserContext, expect, Page, test } from '@playwright/test';
import { getLoginInfo } from '../helpers/user';
import { CommonAction } from '../page/common.po';
import { DashboardPage } from '../page/dashboard.po';
import { HomePage } from '../page/home.po';
import { LoginPage } from '../page/login.po';

export default function createTests(){
  let page: Page;
  let context: BrowserContext;

  test.describe('Sign in screen', () => {
    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext();
      page = await context.newPage();
      const commonPage = new CommonAction(page);

      await commonPage.openUrl();
    });

    test('should render login button', async () => {
      const getStarted = page.getByRole('button', { name: /get started/i }).first();
      await getStarted.waitFor({ state: 'visible' });

      await expect(getStarted).toBeInViewport();
    });

    test('TC-014 - Login successfully boat owner account', async () => {
      const loginInfo = getLoginInfo('boatOwner');
      if (!loginInfo) {
        throw new Error('Missing login info');
      }

      const homePage = new HomePage(page);
      await homePage.clickLoginBtn();

      const loginPage = new LoginPage(page);
      await loginPage.inputEmail(loginInfo.email);
      await loginPage.inputPassword(loginInfo.password);
      await loginPage.clickLoginBtn();

      const dashboardPage = new DashboardPage(page);
      await dashboardPage.verifyDashBoardPage();
    });
  });
}
