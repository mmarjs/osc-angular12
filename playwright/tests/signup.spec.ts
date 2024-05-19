import { BrowserContext, Page, test } from '@playwright/test';
import { CommonAction } from '../page/common.po';
import { HomePage } from '../page/home.po';
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

    test('TC-003 - To check Email field with valid email id must contain @ and .com ', async () => {
      const signUpPage = new SignUpPage(page);
      const homPage = new HomePage(page);
      await homPage.clickGetStaredBtn();
      await signUpPage.inputEmailAddress('Automationtest');
      await signUpPage.clickRaiseBtn('Complete form below');
      await signUpPage.verifyEmailErrorMessage(
        'Please provide a valid email address'
      );
    });
  });
}
