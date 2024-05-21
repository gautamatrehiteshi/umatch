import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import CreateLocalUserDto from './dto/create-local.user.dto';
import { AuthorizationGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
  @Post('/new')
  createLocalUser(@Body() body: CreateLocalUserDto) {
    return this.userService.createlocal(body);
  }
  @Post('/resend')
  resend(@Body() body: Partial<CreateLocalUserDto>) {
    return this.userService.resendOtp(body);
  }

  @Post('/verify')
  verifyUser(@Body() body: any) {
    return this.userService.verifyUserDetails(body);
  }
  @UseGuards(AuthorizationGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
