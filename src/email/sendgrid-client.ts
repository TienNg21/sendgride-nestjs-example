import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SendGridClient {
  private logger: Logger;
  constructor() {
    //Initialize the logger. This is done for simplicity. You can use a logger service instead
    this.logger = new Logger(SendGridClient.name);
    //Get the API key from config service or environment variable
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(mail);
      this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
    } catch (error) {
      //You can do more with the error
      this.logger.error('Error while sending email', error);
      throw error;
    }
  }
}
