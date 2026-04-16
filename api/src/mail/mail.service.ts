import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, otp: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to the platform',
      html: `
        <h1>Hello ${otp}</h1>
        <p>Your account was created successfully.</p>
      `,
    });
  }
}
