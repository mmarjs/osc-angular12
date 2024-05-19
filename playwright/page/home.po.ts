import { Locator, Page, expect } from '@playwright/test';

import { CommonAction } from './common.po';

export class HomePage extends CommonAction {
  readonly page: Page;
  readonly getStartedBtn: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.getStartedBtn = this.page.locator('button[type="button"]', {hasText: 'Get Started'});
    this.loginBtn = this.page.getByRole('button', { name: 'Login' });
  }

  async clickGetStaredBtn(): Promise<void> {
    await this.getStartedBtn.first().click();
  }

  
  async clickLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }
 
}
