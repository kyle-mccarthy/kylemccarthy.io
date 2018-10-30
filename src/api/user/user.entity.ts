import { IsConfirmed } from '@src/common/validation/confirmed/confirmed.decorator';
import { IsUnique } from '@src/common/validation/unique/unique.decorator';
import { Exclude } from 'class-transformer';
import { IsDefined, IsEmail, IsOptional, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsDefined({
    always: true,
  })
  public name!: string;

  @Column()
  @IsEmail(undefined, {
    always: true,
  })
  @IsDefined({
    always: true,
  })
  @IsUnique({
    message: 'Another user with the email $value already exists',
    groups: ['registration'],
  })
  public email!: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @IsConfirmed({
    groups: ['registration'],
    message: 'Password and the password confirmation must be the same',
  })
  @MinLength(8, {
    always: true,
    message: 'The password must be at least 8 characters long',
  })
  public password!: string;

  @Exclude({ toPlainOnly: true })
  @IsOptional()
  public passwordConfirmed?: string;
}
