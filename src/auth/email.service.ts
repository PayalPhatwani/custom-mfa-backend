import { Injectable } from "@nestjs/common";
import * as Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_API_TOKEN!, // add in Render env vars
      })
    );
  }

  async sendMfaToken(email: string, code: string) {
    try {
      const sender = {
        address: "hello@demomailtrap.co", // Mailtrap’s default sender domain
        name: "Custom MFA System",
      };

      const info = await this.transporter.sendMail({
        from: sender,
        to: [email],
        subject: "Your MFA Verification Code",
        text: `Your verification code is ${code}. It is valid for 10 minutes.`,
        category: "MFA",
      });

      return info;
    } catch (err: any) {
      console.error("Mailtrap Error:", err.response?.data || err.message);
      throw new Error("Failed to send MFA email");
    }
  }
}
