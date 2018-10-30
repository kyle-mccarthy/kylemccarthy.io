import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { testConnection } from '@src/testing/utils/database';
import { User } from './user.entity';
import { UserService } from './user.service';

const mockUsers = [
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

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(testConnection([User])),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    await service.save(mockUsers.map(user => service.create(user)));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('invalid user should not pass validation', async () => {
    const partialUser = { email: 'test' } as User;

    const user = await service.create(partialUser);
    const errors = await service.validate(user);

    expect(errors).toBeDefined();
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors).not.toHaveLength(0);
  });

  it('valid user should pass validation', async () => {
    const validUser = {
      email: 'validgmailemail@gmail.com',
      name: 'test',
      password: '!#$ADF!#',
      passwordConfirmed: '!#$ADF!#',
    };

    const user = await service.create(validUser);
    const errors = await service.validate(user);

    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors).toHaveLength(0);
  });

  it('user with duplicate email should not pass validation', async () => {
    const duplicateUser = mockUsers[0];

    const user = await service.create(duplicateUser);
    user.passwordConfirmed = user.password;
    const errors = await service.validate(user);

    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toHaveProperty('constraints.UniqueValidator');
  });

  it('should find user by email', async () => {
    const existingUser = mockUsers[0];

    const user = await service.findByEmail(existingUser.email);

    expect(user).toBeDefined();
    expect({
      name: user!.name,
      email: user!.email,
    }).toEqual({
      name: existingUser.name,
      email: existingUser.email,
    });
  });

  it('should find all', async () => {
    const users = await service.findAll();
    expect(users).toHaveLength(10);
  });

  it('should save valid user', async () => {
    const newUser = service.create({
      name: 'Dolores',
      email: 'Woodrow_Williamson6@yahoo.com',
      password: 'Sc9fr8eKj5dUVuE',
      passwordConfirmed: 'Sc9fr8eKj5dUVuE',
    });

    expect(await service.validate(newUser)).toHaveLength(0);

    const user = (await service.save(newUser)) as User;
    expect(user.id).toBeDefined();
    expect(user.id).toEqual(11);
  });

  it('should find by ID', async () => {
    const user = await service.findById(1);
    expect(user).toBeDefined();
    expect(user!.id).toEqual(1);
  });

  it('should update user when existing saved', async () => {
    const user = await service.findById(1);
    const ogName = user!.name;
    const nextName = 'New Name';

    user!.name = nextName;
    const updatedUser = await service.save(user);

    expect(updatedUser).toBeDefined();
    expect(user!.email).toEqual(updatedUser!.email);
    expect(user!.id).toEqual(updatedUser!.id);
    expect(updatedUser!.name).not.toEqual(ogName);
    expect(updatedUser!.name).toEqual(nextName);
  });

  it('should hash a string', async () => {
    const plaintextString = 'test string';
    let encryptedString = null;
    let error = null;

    try {
      encryptedString = service.hashPassword(plaintextString);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(null);
    expect(encryptedString).not.toEqual(null);
    expect(plaintextString).not.toEqual(encryptedString);
  });

  it('should truthfully matched hashed string and corresponding plaintext', async () => {
    const plaintextString = 'test string';
    const encryptedString = await service.hashPassword(plaintextString);

    let didMatch = null;
    let error = null;

    try {
      didMatch = await service.comparePassword(
        plaintextString,
        encryptedString,
      );
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(null);
    expect(didMatch).toEqual(true);
    expect(plaintextString).not.toEqual(encryptedString);
  });

  it('should NOT matched hashed string and different plaintext', async () => {
    const plaintextString = 'test string';
    const encryptedString = await service.hashPassword(plaintextString);

    let didMatch = null;
    let error = null;

    try {
      didMatch = await service.comparePassword(
        'other test string',
        encryptedString,
      );
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(null);
    expect(didMatch).toEqual(false);
  });
});
