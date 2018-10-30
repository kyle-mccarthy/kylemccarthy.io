import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public create(dto: CreateUserDTO): User {
    return plainToClass(User, dto);
  }

  public async validate(
    user: User,
    options?: ValidatorOptions,
  ): Promise<ValidationError[]> {
    const errors = await validate(user, options);

    return errors.map(err => {
      if (
        err.property === 'password' ||
        err.property === 'passwordConfirmation'
      ) {
        delete err.value;
      }
      return err;
    });
  }

  public save(user: any) {
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async hashPassword(str: string) {
    return await bcrypt.hash(str, 10);
  }

  public async comparePassword(plaintext: string, encrypted: string) {
    return await bcrypt.compare(plaintext, encrypted);
  }
}
