import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('coming here');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req) {
    return this.authService.facebookLogin(req);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async localLogin(@Req() req) {
  //   return this.authService.loginUser(req);
  // }
}
