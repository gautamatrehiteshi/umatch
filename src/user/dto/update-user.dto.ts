import { IsEnum, IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  public firstName: string;
  @IsString()
  @IsOptional()
  public lastName: string;
  @IsString()
  @IsOptional()
  public accessToken: boolean;
  @IsString()
  @IsOptional()
  @IsEnum(['artist', 'group', 'label', 'manager', 'admin', 'influencer'])
  public usertype: string;
}
