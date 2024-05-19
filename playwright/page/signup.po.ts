import { Locator, Page, expect } from '@playwright/test';
import { BoatInfo, Constant, ShipyardInfo, SurveyorInfo, UserInfo } from '../helpers/constant';

import { CommonAction } from './common.po';

export class SignUpPage extends CommonAction {
  readonly page: Page;

  readonly firstNameTxt: Locator;
  readonly lastNameTxt: Locator;
  readonly emailTxt: Locator;
  readonly userNameTxt: Locator;
  readonly passwordTxt: Locator;
  readonly confirmPasswordTxt: Locator;

  readonly deviceNameTxt: Locator;
  readonly submitBtn: any;
  readonly countryDDl: Locator;
  readonly stateTxt: Locator;
  readonly cityTxt: Locator;
  readonly addressTxt: Locator;
  readonly zipCodeTxt: Locator;

  readonly emailErrorMessage: Locator;
  readonly typeIamDDL: Locator;
  readonly userTypeOption: any;
  readonly shipyardName: Locator;
  readonly countryDDL: Locator;
  readonly countryOption: any;
  readonly phoneDDL: Locator;
  readonly businessEmail: Locator;
  readonly shipyardWebsite: Locator;
  readonly accountCreatedTxt: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.firstNameTxt = this.page.locator('#signup-firstName');
    this.lastNameTxt = this.page.locator('#signup-lastName');
    this.userNameTxt = this.page.locator('#signup-login');
    this.emailTxt = this.page.locator('#signup-email');
    this.passwordTxt = this.page.locator('#signup-password');
    this.confirmPasswordTxt = this.page.locator('#signup-confirm');

    this.deviceNameTxt = this.page.locator('#-name');
    this.submitBtn = (buttonName: string): Locator => {
      return this.page.locator('button[type="submit"]', { hasText: buttonName });
    };
    this.countryDDl = this.page.locator('input[name="country"]');
    this.stateTxt = this.page.locator('#-state');
    this.cityTxt = this.page.locator('#-city');
    this.addressTxt = this.page.locator('#-address');
    this.zipCodeTxt = this.page.locator('#-zipCode');
    this.typeIamDDL = this.page.locator('#signup-usertype');
    this.userTypeOption = (name: string): Locator => {
      return this.page.locator('.mat-option-text', { hasText: name });
    };
    this.countryDDL = this.page.getByRole('combobox', { name: 'country' });
    this.phoneDDL = this.page.locator('#phone');
    this.businessEmail = this.page.locator('#-businessEmail');
    this.countryOption = (country: string): Locator => {
      return this.page.getByRole('option', { name: country }).locator('span')
    };
    this.emailErrorMessage = this.page.locator('app-field-email mat-error');
    this.accountCreatedTxt = this.page.getByRole('heading', { name: 'Account Created' });
  }

  async inputFirstName(firstName: string): Promise<void> {
    await this.firstNameTxt.fill(firstName);
  }

  async inputEmailAddress(emailAddress: string): Promise<void> {
    await this.emailTxt.type(emailAddress);
  }

  async verifyEmailErrorMessage(message: string): Promise<void> {
    expect(await this.emailErrorMessage.innerText()).toEqual(message);
  }

  async verifyAccountIsCreated(): Promise<void> {
    await this.accountCreatedTxt.waitFor({
      state: 'visible',
      timeout: Constant.longWaitElementVisible,
    })
    await expect(this.accountCreatedTxt).toBeVisible();
  }

  async registerPersonalInfo(user: UserInfo): Promise<void> {
    await this.firstNameTxt.fill(user.firstName);
    await this.lastNameTxt.fill(user.lastName);
    await this.emailTxt.fill(user.emailAddress);
    await this.userNameTxt.fill(user.userName);
    await this.passwordTxt.click();
    await this.passwordTxt.fill(Constant.defaultPassword);
    await this.confirmPasswordTxt.click();
    await this.confirmPasswordTxt.fill(Constant.defaultPassword);
   }

   async clickCreateAccountBtn(): Promise<void> {
    await this.submitBtn('Create Account').click();
   }

   async registerFirstStepShipyardInfo(shipyard: ShipyardInfo): Promise<void> {
    await this.typeIamDDL.click();
    await this.userTypeOption('Shipyard').click();
    await this.deviceNameTxt.fill(shipyard.name);
    await this.selectInputComboboxWithSingleValue(this.countryDDl, 'div[role="listbox"] span', shipyard.country);
    await this.phoneDDL.fill(shipyard.phone);
    await this.businessEmail.fill(shipyard.businessEmail);
    await this.submitBtn('Next').click();
   }

   async registerSecondStepShipyard(shipyard: ShipyardInfo): Promise<void> {
    await this.stateTxt.fill(shipyard.state);
    await this.cityTxt.fill(shipyard.city);
    await this.zipCodeTxt.fill(shipyard.zipCode);
    await this.clickCreateAccountBtn();
   }

   async registerFirstStepSurveyorInfo(surveyor: SurveyorInfo): Promise<void> {
    await this.typeIamDDL.click();
    await this.userTypeOption('Surveyor').click();
    await this.deviceNameTxt.fill(surveyor.businessName);
    await this.selectInputComboboxWithSingleValue(this.countryDDl, 'div[role="listbox"] span', surveyor.country);
    await this.phoneDDL.fill(surveyor.phone);
    await this.businessEmail.fill(surveyor.businessEmail);
    await this.submitBtn('Next').click();
   }

   async registerSecondSurveyorInfo(surveyor: SurveyorInfo): Promise<void> {
    await this.cityTxt.fill(surveyor.city);
    await this.stateTxt.fill(surveyor.state);
    await this.zipCodeTxt.fill(surveyor.zipCode);
    await this.clickCreateAccountBtn();
   }
}
