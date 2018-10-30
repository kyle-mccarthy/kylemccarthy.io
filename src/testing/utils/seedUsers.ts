import { TestingModule } from '@nestjs/testing';
import { AuthService } from '@src/api/auth/auth.service';
import { CreateUserDTO } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/user.entity';
import { UserService } from '@src/api/user/user.service';
import { Connection } from 'typeorm';

export interface TestUser {
  user: User;
  dto: CreateUserDTO;
}

export const mockUsers: CreateUserDTO[] = [
  {
    name: 'Paxton',
    email: 'Gail.Koepp1@hotmail.com',
    password: 'iELxubWFOR1rFl5',
  },
  {
    name: 'Naomie',
    email: 'Payton6@gmail.com',
    password: 'eJzdsfx5ZLPp7Cv',
  },
  {
    name: 'Casimer',
    email: 'Wilfredo78@hotmail.com',
    password: 'pfl6XcjlwBCxbhr',
  },
  {
    name: 'Isidro',
    email: 'Crystel.Schroeder@gmail.com',
    password: 'Bax3JoyYbw67_Y5',
  },
  {
    name: 'Lou',
    email: 'Kaelyn_Kuhic41@hotmail.com',
    password: 'J756c0gLLArnfHG',
  },
  {
    name: 'Amanda',
    email: 'Amiya19@hotmail.com',
    password: 'JuS2WQ3c0fX4INv',
  },
  {
    name: 'Miller',
    email: 'Jan87@gmail.com',
    password: 'yAdcNX1e6NSnYUe',
  },
  {
    name: 'Lesley',
    email: 'Odell17@yahoo.com',
    password: 'ERxRzyl8RAwrAqM',
  },
  {
    name: 'Westley',
    email: 'Harmon_McCullough17@yahoo.com',
    password: 'X2yAsRDWxVRE20i',
  },
  {
    name: 'Stan',
    email: 'Cordelia_Wolff@gmail.com',
    password: 'fKODF6Mp6eLGtdN',
  },
];

export async function seedUsers(
  testModule: TestingModule,
  sync: boolean = true,
): Promise<TestUser[]> {
  const service = testModule.get(UserService) as UserService;
  const connection = testModule.get(Connection);

  if (sync) {
    await connection.synchronize();
  }

  const users = await service.save(
    await Promise.all(
      mockUsers.map(async dto => {
        const user = service.create(dto);
        user.password = await service.hashPassword(user.password);
        return user;
      }),
    ),
  );

  return mockUsers.map(dto => ({
    user: users.shift(),
    dto,
  }));
}
