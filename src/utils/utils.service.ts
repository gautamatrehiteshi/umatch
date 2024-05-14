import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import * as nodemailer from 'nodemailer';
import { Otp } from './entity/otp.entity';
import { Op } from 'sequelize';
@Injectable()
export class UtilsService {
  constructor(@Inject('OtpModel') private OtpModel: typeof Otp) {}
  async generateOTP(email: string): Promise<number> {
    try {
      const otp = otpGenerator.generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const otpdetails = await this.OtpModel.create({
        email: email,
        otp: otp,
        otpExpiry: new Date(Date.now() + 1 * 60 * 1000),
      });
      if (!otpdetails) {
        throw new BadRequestException('Problem creating otp');
      }

      return otp;
    } catch (error) {
      throw new Error(error);
    }
  }
  async sendOtptoMail(email: string, otp: number) {
    const transporter = nodemailer.createTransport({
      //   host: 'smtp.zoho.com',
      service: 'gmail',

      // service: process.env.EMAIL_SERVICE,
      //   port: 587,
      //   port: 465,
      //   secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      text: otp.toString(),
    });
  }

  async verifyOTP(email: string, otp: number) {
    const OTP = await this.OtpModel.findOne({
      where: {
        email: email,
        otp: otp,
        otpExpiry: { [Op.gte]: Date.now() },
      },
    });
    if (!OTP) {
      return false;
    }
    return true;
  }
}
