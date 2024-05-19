import { BrowserContext, expect, Page, test } from '@playwright/test';
import { env } from '../helpers/env';
import { testWithMail } from '../helpers/mail';
import { generateUserInfo, saveLoginInfo } from '../helpers/user';
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
      'TC_002 - To check signup form with mandatory field boat owner @email',
      async (mail) => {
        const signUpPage = new SignUpPage(page);
        const homePage = new HomePage(page);
        await homePage.clickGetStaredBtn();

        const userInfo = generateUserInfo();

        await signUpPage.registerPersonalInfo(userInfo);
        await signUpPage.clickCreateAccountBtn();

        const verifyLink = await mail.getVerifyLink(userInfo.emailAddress);
        console.info('verifyLink', verifyLink);
        await signUpPage.openUrlWithoutAuthz(verifyLink);
        const hasWelcomeMail = await mail.getWelcomeEmail(
          userInfo.emailAddress
        );
        expect(hasWelcomeMail).toEqual(true);

        await homePage.openUrlWithoutAuthz(env.url);
        await homePage.clickLoginBtn();

        saveLoginInfo('boatOwner', {
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
