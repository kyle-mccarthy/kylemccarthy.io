import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public create(dto: CreateUserDTO): User {
    return this.userRepository.create(dto);
  }

  public async validate(user: User): Promise<ValidationError[]> {
    return validate(user);
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
}
