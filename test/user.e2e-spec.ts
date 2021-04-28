import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CustomValidationPipe } from './../src/pipes/custom-validation.pipe';
import { useContainer } from 'class-validator';
import { Sequelize } from 'sequelize-typescript';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Sequelize;
  const truncateUser = `DELETE FROM people WHERE (cpf = '837.244.851-58');`;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CustomValidationPipe],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new CustomValidationPipe());
    await app.init();

    dbConnection = moduleFixture.get(Sequelize);
  });
  afterEach(async () => {
    await app.close();
  });

  it('/users (POST) - should create a new user', async (done) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await dbConnection.query(truncateUser);

    const user = {
      name: 'Admin 1',
      cpf: '837.244.851-58',
      email: 'admin@mail1.com',
      birthday: '1970-08-09',
      gender: 'MALE',
      avatar:
        'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
      addresses: [
        {
          zipcode: '08270-001',
          street: 'Avenida Afonso de Sampaio e Sousa',
          number: '302',
          neighborhood: 'Itaquera',
          city: 'São Paulo',
          state: 'SP',
          country: 'BRAZIL',
        },
      ],
      contacts: [
        {
          contactType: 'CELULAR',
          value: '(34) 992-150-179',
        },
      ],
      user: {
        login: 'admin@mail.com',
        password: '123456',
        roles: [1],
      },
    };
    const userResponse = {
      code: 201,
      message: 'Usuário criado com sucesso!',
      data: {},
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect(userResponse)
      .expect(201);
    done();
  });

  it('/users (POST) - should return error with validates messages when pass empty body', () => {
    const validationMessages = {
      code: 422,
      message: 'Não foi possivel validar.',
      data: {
        name: 'Campo precisa ser de texto.',
        cpf: 'Esse Cpf já está cadastrado',
        email: 'Esse Email já está cadastrado',
        birthday: 'Data nascimento fora do formato.',
        gender: 'Campo precisa ser de texto.',
        avatar: 'Campo precisa ser de texto.',
        user: 'Campo obrigatório.',
        addresses: 'Campo está vazio.',
        contacts: 'Campo está vazio.',
      },
    };
    return request(app.getHttpServer())
      .post('/users')
      .set('Content-Type', 'application/json')
      .expect(422)
      .expect(validationMessages);
  });
});
