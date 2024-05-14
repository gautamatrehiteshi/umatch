import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './entities/user.entity';
import CreateLocalUserDto from './dto/create-local.user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { where } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private userModel: typeof User,
    private utilsService: UtilsService,
  ) {}
  async create(body: CreateUserDto) {
    if (body.usertype === 'web') {
      const existing_user = await this.findOneUser(body.email);
      if (existing_user) {
        throw new BadRequestException('User already exists.');
      }
      return await this.userModel.create({ ...body });
    }
    const existing_user = await this.findOneUser(body.email);
    if (existing_user) {
      throw new BadRequestException('User already exists.');
    }
    return await this.userModel.create({ ...body });
  }

  // async createlocal(body: CreateLocalUserDto) {
  async createlocal(body: CreateLocalUserDto) {
    try {
      if (!(body.loginType === 'local')) {
        throw new UnauthorizedException('Invalid credentials.');
      }
      const existing_user = await this.findOneUser(body.email);
      if (existing_user) {
        throw new BadRequestException('User already exists.');
      }
      //create a function to generate otp.
      const otp = await this.utilsService.generateOTP(body.email);
      if (!otp) {
        throw new BadRequestException('Otp not created.');
      }
      await this.userModel.create({ ...body });
      await this.utilsService.sendOtptoMail(body.email, otp);
      console.log();
      return 'Please verify otp sent on your mail to proceed.';
      //save the otp in a database where we are going to store user and otp of that user
      //write a function for nodemailer to send otp to that person
      //create a verify otp function//so if otp is verified successfully, then we have to update isVerified column of user.
      //if user if not verified then we have to give him option to resend otp
      // const existing_user = await this.findOneUser(body.email);
      // if (existing_user) {
      //   throw new BadRequestException('User already exists.');
      // }
      // return await this.userModel.create({ ...body });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async verifyUserDetails(body: any) {
    const verified = await this.utilsService.verifyOTP(body.email, body.otp);
    if (!verified) {
      throw new BadRequestException('Invalid otp.');
    }
    const user = await this.userModel.update(
      { isVerified: true },
      {
        where: {
          email: body.email,
        },
      },
    );
    if (!user) {
      throw new BadRequestException('Bad Request. User details not updated');
    }
    return HttpStatus.OK;
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      where: { id: id },
    });
  }
  async findOneUser(email: string) {
    return await this.userModel.findOne({
      where: { email: email },
    });
  }

  async update(id: number, body: UpdateUserDto) {
    const existing_user = await this.findOne(id);
    if (!existing_user) {
      throw new BadRequestException('User to update Not found.');
    }
    const updated_user = await this.userModel.update(
      { ...body },
      { where: { id: id }, returning: true },
    );
    return updated_user;
  }

  async remove(id: number) {
    const existing_user = await this.findOne(id);
    if (!existing_user) {
      throw new BadRequestException('User to delete Not found.');
    }
    await existing_user.destroy();
  }
  async resendOtp(body: Partial<CreateLocalUserDto>) {
    await this.utilsService.generateOTP(body.email);
    return 'Otp sent on email';
  }
}
