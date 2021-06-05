import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CustomValidationPipe } from '../src/pipes/custom-validation.pipe';
import { useContainer } from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
import { JwtAuthGuard } from '../src/modules/auth/jwt-auth.guard';
import { CustomExceptionFilter } from '../src/filters/exception.filter';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Sequelize;
  const fakeUser = {
    id: 1,
    name: 'Admin 1',
    avatar:
      'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
    modules: [
      {
        description: 'ACL',
        title: 'ACL',
        router: '/acl',
        submenus: {
          menus: [
            {
              title: 'Criar',
              router: 'register',
            },
            {
              title: 'List',
              router: 'list',
            },
          ],
        },
      },
      {
        description: 'users',
        title: 'Usuários',
        router: '/users',
        submenus: {
          menus: [
            {
              title: 'Criar',
              router: 'register',
            },
            {
              title: 'List',
              router: 'list',
            },
          ],
        },
      },
      {
        description: 'dashboard',
        title: 'Dashboard',
        router: '/dashboard',
        submenus: null,
      },
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CustomValidationPipe],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          if (req.headers.authorization !== 'Bearer valid') {
            return false;
          }
          req.user = fakeUser;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new CustomValidationPipe());
    app.useGlobalFilters(new CustomExceptionFilter());
    await app.init();

    dbConnection = moduleFixture.get(Sequelize);
  });
  afterEach(async () => {
    await app.close();
  });

  it('/v1/auth (POST)', () => {
    const credentials = {
      login: 'admin@admin.com',
      password: '123456',
    };
    return request(app.getHttpServer())
      .post('/auth')
      .send(credentials)
      .set('Content-Type', 'application/json')
      .expect(200);
  });

  it('/v1/auth (POST) - Invalid credntials', () => {
    const credentials = {
      login: 'invalid@admin.com',
      password: 'invalid',
    };
    return request(app.getHttpServer())
      .post('/auth')
      .send(credentials)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect({
        code: 400,
        message: 'Dados incorretos!',
        data: {},
      });
  });

  it('/v1/auth/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/user')
      .set('Authorization', `Bearer valid`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(fakeUser);
  });
});
