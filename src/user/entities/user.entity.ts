import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  public firstName: string;
  @Column
  public lastName: string;

  @Column
  public email: string;

  @Column
  public password: string;

  @Column
  public accessToken: string;

  @Column
  public loginType: string;

  @Column
  public isVerified: boolean;

  @Column({
    type: DataTypes.ENUM(
      'artist',
      'group',
      'label',
      'manager',
      'admin',
      'influencer',
    ),
    defaultValue: 'artist',
  })
  public usertype: string;
}

export const UserProviders = [
  {
    provide: 'UserModel',
    useValue: User,
  },
];
