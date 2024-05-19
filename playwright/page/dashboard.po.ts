import { Locator, Page, expect } from '@playwright/test';
import { Constant } from '../helpers/constant';

import { CommonAction } from './common.po';

export class DashboardPage extends CommonAction {
  readonly page: Page;
  readonly titlePage: Locator;
  readonly dashboardTxt: Locator;
  readonly DraftLink: Locator;
  readonly DocumentsLink: Locator;
  readonly DashboardLink: Locator;
  readonly profileName: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.titlePage = this.page.locator('h2.title-page');
    this.dashboardTxt = this.page.getByRole('main').getByText('Dashboard');
    this.DocumentsLink = this.page.getByRole('link', { name: 'Documents' });
    this.DraftLink = this.page.getByRole('link', { name: 'Drafts' });
    this.DashboardLink = this.page.getByRole('link', { name: 'Dashboard' });
    this.profileName = this.page.locator('button[applink="PROFILE"]');
  }

  async verifyDashBoardPage(): Promise<void> {
    await expect(this.DashboardLink).toBeVisible({
      timeout: Constant.longWaitElementVisible,
    });
    await expect(this.dashboardTxt).toBeVisible();
    await expect(this.DocumentsLink).toBeVisible();
    await expect(this.DraftLink).toBeVisible();
    await expect(this.DashboardLink).toBeVisible();
  }

  async verifyTitlePage(): Promise<void> {
    await expect(this.titlePage).toBeVisible({
      timeout: Constant.longWaitElementVisible,
    });
    expect(this.titlePage).toContainText('Dashboard');
  }

  async verifyProfileName(name: string): Promise<void> {
    await this.profileName.waitFor({
      state: 'visible',
      timeout: Constant.longWaitElementVisible,
    });
    await expect(this.profileName).toContainText(name);
  }
}
