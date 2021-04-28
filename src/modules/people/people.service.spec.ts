import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getModelToken } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { Sequelize } from 'sequelize-typescript';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
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

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
