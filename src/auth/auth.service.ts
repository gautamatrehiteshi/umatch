import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      throw new NotFoundException('No google user found.');
    }
    // console.log(req.user, 'req>>>>>>>>>>>>>>>>>>>>>>>');
    const existing_user = await this.userService.findOneUser(req.user.email);
    if (existing_user) {
      existing_user.dataValues.accessToken = req.user.accessToken;
      existing_user.save();
      return {
        message: 'success',
        user: existing_user,
        text: 'existing user',
      };
    }
    if (!existing_user) {
      const new_user = await this.userService.create(req.user);
      return {
        message: 'new user created successfully.',
        user: new_user,
      };
    }

    // return {
    //   message: 'User information from google',
    //   user: req.user,
    // };
  }

  async facebookLogin(req) {
    if (!req.user) {
      throw new NotFoundException('No facebook user found.');
    }
    // console.log(req.user, 'req>>>>>>>>>>>>>>>>>>>>>>>');
    const existing_user = await this.userService.findOneUser(req.user.email);
    if (existing_user) {
      existing_user.dataValues.accessToken = req.user.accessToken;
      existing_user.save();
      return {
        message: 'success',
        user: existing_user,
        text: 'existing user',
      };
    }
    if (!existing_user) {
      const new_user = await this.userService.create(req.user);
      return {
        message: 'new user created successfully.',
        user: new_user,
      };
    }

    // return {
    //   message: 'User information from google',
    //   user: req.user,
    // };
  }
  // async loginUser(req): Promise<any> {
  //   const { email, password, loginType, ...re } = req.user;
  //   console.log(req.user);
  //   if (loginType !== 'local') {
  //     throw new UnauthorizedException(
  //       'Invalid credentials provided for local login.',
  //     );
  //   }
  //   const user = await this.userService.findOneUser(email);
  //   if (!user) {
  //     throw new NotFoundException(`User for email ${email} not found.`);
  //   }
  //   const ext_pass = user.password;
  //   const comp_pass = password;
  //   const val = bcrypt.compare(ext_pass, comp_pass);
  //   if (!val) {
  //     throw new UnauthorizedException('Incorrect password. Please try again.');
  //   }
  //   const accessToken = await this.jwtService.sign({ ...re, email });
  //   user.accessToken = accessToken;
  //   await user.save();
  //   console.log(user);
  //   return req.user;
  // }
}
