import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendGridClient } from './sendgrid-client';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendTestEmail(
    recipient: string,
    body = 'This is a test mail',
  ): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: { email: 'no-reply@langfluid.com', name: 'LangFluid' },
      subject: 'Test email',
      content: [{ type: 'text/plain', value: body }],
    };
    await this.sendGridClient.send(mail);
  }

  async sendEmailWithTemplate(
    recipient: string,
    body: { username: string; verification_url: string },
  ): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      cc: 'nghuutien0912@gmail.com', //Assuming you want to send a copy to this email
      from: { email: 'no-reply@langfluid.com', name: 'LangFluid' },
      templateId: process.env.SENDGRID_TEST_TEMPLATE, //Retrieve from config service or environment variable
      subject: 'Test email with template',
      dynamicTemplateData: {
        username: body.username,
        verification_url: body.verification_url,
      }, //The data to be used in the template
    };
    await this.sendGridClient.send(mail);
  }
}
