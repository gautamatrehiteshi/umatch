import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
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
