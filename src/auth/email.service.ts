import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });
  }

  async sendMfaToken(email: string, code: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"OTP (Custom MFA Project)" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "Your MFA Verification Code",
        text: `Your verification code is ${code}. It is valid for 10 minutes.`,
      });

      return info;
    } catch (err) {
      console.error("Email Error:", err);
      throw new Error("Failed to send MFA email");
    }
  }
}
