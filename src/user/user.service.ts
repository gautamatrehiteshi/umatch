import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateLocalUserDto } from './dto/create-local.user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserModel') private userModel: typeof User) {}
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
  async createlocal(body: CreateLocalUserDto) {
    if (!(body.loginType === 'local')) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const existing_user = await this.findOneUser(body.email);
    if (!existing_user) {
      throw new BadRequestException('User already exists.');
    }
    const otp=1234;
    //create a function to generate otp.
    //save the otp in a database where we are going to store user and otp of that user
    //write a function for nodemailer to send otp to that person
    //create a verify otp function//so if otp is verified successfully, then we have to update isVerified column of user.
    //if user if not verified then we have to give him option to resend otp
    return await this.userModel.create({ ...body });

    // const existing_user = await this.findOneUser(body.email);
    // if (existing_user) {
    //   throw new BadRequestException('User already exists.');
    // }
    // return await this.userModel.create({ ...body });
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
}
