import { BrowserContext, expect, Page, test } from '@playwright/test';
import { Constant } from '../helpers/constant';
import { env } from '../helpers/env';
import { testWithMail } from '../helpers/mail';
import { generateShipyardInfo, generateUserInfo, saveLoginInfo } from '../helpers/user';
import { CommonAction } from '../page/common.po';
import { DashboardPage } from '../page/dashboard.po';
import { HomePage } from '../page/home.po';
import { LoginPage } from '../page/login.po';
import { SignUpPage } from '../page/signup.po';

export default function createTests() {
  let page: Page;
  let context: BrowserContext;
  test.describe('Sign up screen', () => {
    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext();
      page = await context.newPage();
      const commonPage = new CommonAction(page);

      await commonPage.openUrl();
    });

    testWithMail(
      'TC_003 - To check signup form with mandatory field for shipyard @email',
      async (mail) => {
        const signUpPage = new SignUpPage(page);
        const homePage = new HomePage(page);

        await homePage.clickGetStaredBtn();

        const userInfo = generateUserInfo();
        const shipyardInfo = generateShipyardInfo();

        await signUpPage.registerPersonalInfo(userInfo);
        await signUpPage.registerFirstStepShipyardInfo(shipyardInfo);
        await signUpPage.registerSecondStepShipyard(shipyardInfo);
        await signUpPage.verifyAccountIsCreated();

        const verifyLink = await mail.getVerifyLink(userInfo.emailAddress);
        await signUpPage.openUrlWithoutAuthz(verifyLink);
        expect(await mail.getWelcomeEmail(userInfo.emailAddress)).toEqual(true);

        await homePage.openUrlWithoutAuthz(env.url);
        await homePage.clickLoginBtn();

        saveLoginInfo('shipyard', {
          email: userInfo.emailAddress,
          password: userInfo.password,
          login: userInfo.userName,
        });

        const loginPage = new LoginPage(page);
        await loginPage.inputEmail(userInfo.emailAddress);
        await loginPage.inputPassword(userInfo.password);
        await loginPage.clickLoginBtn();

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.verifyProfileName(userInfo.firstName);
      }
    );
  });
}
