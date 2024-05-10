import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @IsString()
  @IsNotEmpty()
  public lastName: string;
  @IsString()
  @IsNotEmpty()
  public email: string;
  @IsString()
  @IsNotEmpty()
  public accessToken: string;
  @IsString()
  @IsNotEmpty()
  public loginType: string;
  @IsBoolean()
  @IsNotEmpty()
  public isVerified: boolean;
  @IsString()
  @IsNotEmpty()
  @IsEnum(['artist', 'group', 'label', 'manager', 'admin', 'influencer'])
  public usertype: string;
}
