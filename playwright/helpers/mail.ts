import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';
import {
  MailinatorClient,
  GetInboxRequest,
  Sort,
  GetLinksRequest,
} from 'mailinator-client';
import { env } from './env';

const waitSec = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

export default class MailHelper {
  private client: MailinatorClient = new MailinatorClient(
    env.mailinatorKey
  );

  private async getInbox(inbox: string, last = 10) {
    const response = await this.client.request(
      new GetInboxRequest(env.mailinatorDomain, inbox, 0, last, Sort.DESC, true)
    );

    return response;
  }

  private async getLinkFromEmail(inbox: string, messageId: string) {
    const response = await this.client.request(
      new GetLinksRequest(env.mailinatorDomain, inbox, messageId)
    );

    return response.result?.links ?? [];
  }

  private getInboxFromMail(mail: string) {
    return mail.split('@')[0];
  }

  private async getMessages(inbox: string) {
    await waitSec(20);

    const box = await this.getInbox(inbox, 1);
    return box.result?.msgs ?? [];
  }

  static getEmail() {
    return `test${faker.datatype.number(1000)}@${env.mailinatorDomain}`;
  }

  async getVerifyLink(mail: string) {
    const inbox = this.getInboxFromMail(mail);
    console.log('inbox', inbox);
    const msgs = await this.getMessages(inbox);
    const id = msgs?.[0]?.id;
    if (!id) {
      throw new Error('Email not found');
    }

    const links = await this.getLinkFromEmail(inbox, id);
    const link = links[0];
    if (!link) {
      throw new Error('Link not found');
    }

    return link.toString();
  }

  async getWelcomeEmail(email: string): Promise<boolean> {
    const inbox = this.getInboxFromMail(email);
    const msgs = await this.getMessages(inbox);

    return !!msgs.find((m) => m.subject === 'Welcome to Ocean Service Center!');
  }
}

export function testWithMail(
  name: string,
  fn: (mail: MailHelper) => Promise<void>
) {
  const emailMark = ' @email';
  const nm = name.includes(emailMark) ? name : `${name}${emailMark}`;
  return test(nm, async () => {
    test.setTimeout(60000);
    test.slow();

    const mailHelper = new MailHelper();
    await fn(mailHelper);
  });
}
