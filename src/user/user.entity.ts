import { IsUnique } from '@src/common/validation/unique/unique.decorator';
import { IsAlphanumeric, IsDefined, IsEmail, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsDefined()
  public name!: string;

  @Column()
  @IsEmail()
  @IsDefined()
  @IsUnique({
    message: 'Another user with the email $value already exists',
  })
  public email!: string;

  @Column()
  @MinLength(8)
  @IsDefined()
  public password!: string;
}
