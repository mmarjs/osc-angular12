import { Locator, Page } from '@playwright/test';
import { env } from '../helpers/env';

const { username, password, url: baseUrl, hasLoginWall } = env;

export class CommonAction {
  readonly page: Page;
  readonly userNameTxt: Locator;
  readonly passwordTxt: Locator;
  readonly loginBtn: Locator;
  readonly raisedBtn = (buttonName: string): Locator => {
    return this.page.locator('button.mat-raised-button', {
      hasText: buttonName,
    });
  };

  constructor(page: Page) {
    this.page = page;
    this.userNameTxt = this.page.locator('input[name=username]');
    this.passwordTxt = this.page.locator('input[name=password]');
    this.loginBtn = this.page.locator('button[type=submit]', {
      hasText: 'Login',
    });
  }

  async openUrl(): Promise<void> {
    await this.page.goto(baseUrl, { timeout: 90 * 1000 });
    if (hasLoginWall) {
      await this.userNameTxt.fill(username);
      await this.passwordTxt.fill(password);
      await this.loginBtn.click();
    }
  }

  async openUrlWithoutAuthz(urlPath: string): Promise<void> {
    await this.page.goto(urlPath, { timeout: 90 * 1000 });
  }

  async clickRaiseBtn(buttonName: string): Promise<void> {
    await this.raisedBtn(buttonName).click();
  }

  async selectInputComboboxWithSingleValue(
    locator: Locator,
    itemLocator: string,
    value: string
  ): Promise<void> {
    await locator.click();
    await this.page.waitForTimeout(2000);
    await locator.click();
    await locator.fill(value);
    await this.page
      .locator(itemLocator, { hasText: value })
      .first()
      .click({ force: true });
  }
}
