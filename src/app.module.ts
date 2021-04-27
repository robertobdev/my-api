import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
const ENV = process.env.NODE_ENV;

console.log('DEBUG', process.env.GRAPHQL_DEBUG);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    GraphQLModule.forRoot({
      debug: process.env.GRAPHQL_DEBUG === 'true',
      playground: process.env.GRAPHQL_DEBUG === 'true',
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: false,
    }),
    PeopleModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
