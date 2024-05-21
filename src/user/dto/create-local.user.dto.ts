import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export default class CreateLocalUserDto {
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
  @IsStrongPassword()
  public password: string;
  @IsString()
  @IsNotEmpty()
  public loginType: string;
  // @IsString()
  // @IsOptional()
  // @IsEnum(['artist', 'group', 'label', 'manager', 'admin', 'influencer'])
  // public usertype: string;
}
