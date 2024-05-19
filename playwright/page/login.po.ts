import { Locator, Page } from '@playwright/test';
import { CommonAction } from './common.po';

export class LoginPage extends CommonAction {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emailInput = this.page.getByPlaceholder('Username or Email');
    this.passwordInput = this.page.getByPlaceholder('Your Password');
    this.loginBtn = this.page.getByRole('button', { name: 'Log In' });
  }

  async inputEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async inputPassword(pass: string): Promise<void> {
    await this.passwordInput.fill(pass);
  }

  async clickLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }
}
