import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-test-email')
  async sendEmail(
    @Body() sendEmailDTO: { recipient: string; body: string },
  ): Promise<void> {
    await this.emailService.sendTestEmail(
      sendEmailDTO.recipient,
      sendEmailDTO.body,
    );
  }

  @Post('send-test-email-with-template')
  async sendEmailWithTemplate(
    @Body()
    sendEmailDTO: {
      recipient: string;
      username: string;
      verification_url: string;
    },
  ): Promise<void> {
    await this.emailService.sendEmailWithTemplate(sendEmailDTO.recipient, {
      username: sendEmailDTO.username,
      verification_url: sendEmailDTO.verification_url,
    });
  }
}
