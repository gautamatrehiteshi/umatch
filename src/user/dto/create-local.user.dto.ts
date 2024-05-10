import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLocalUserDto {
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
  public password: string;
  @IsString()
  @IsNotEmpty()
  public loginType: string;
  @IsString()
  @IsOptional()
  @IsEnum(['artist', 'group', 'label', 'manager', 'admin', 'influencer'])
  public usertype: string;
}
