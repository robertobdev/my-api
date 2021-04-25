import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { Sequelize } from 'sequelize-typescript';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Person),
          useValue: {
            findAll: jest.fn(() => []),
            create: jest.fn(() => {
              a: '1';
            }),
          },
        },
        {
          provide: Sequelize,
          useValue: {
            transaction: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
