import { Column, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Otp extends Model {
  @Column
  public email: string;
  @Column
  public otp: number;
  @Column
  otpExpiry: Date;
}

export const OtpProviders = [
  {
    provide: 'OtpModel',
    useValue: Otp,
  },
];
