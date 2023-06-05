import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
      // by making it true we can use this config module throughout the application (for every further modules created). If its false we must import config module in every modules manually (like here we did)
    // envFilePath: ".local.env"
    envFilePath: ".prod.env"
      // if not mentioned, then default path for env file would be ".env"

  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', //default
    port: 5432, //default
    username: 'postgres', //default
    password: '1234567890', //set initially while configuring postgres
    database: 'mydb', //created or existing db name 
    entities: [],
    synchronize: true,
  }),
  UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
