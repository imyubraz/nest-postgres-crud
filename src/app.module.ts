import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DemoModule } from './demo/demo.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
      // by making it true we can use this config module throughout the application (for every further modules created). If its false we must import config module in every modules manually (like here we did)
    // envFilePath: ".local.env"
    // envFilePath: ".prod.env"
      // if not mentioned, then default path for env file would be ".env"

  }),
  /*
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', //default
    port: 5432, //default
    username: 'postgres', //default
    password: '1234567890', //set initially while configuring postgres
    database: 'mydb', //created or db name 
    entities: [],
    synchronize: true,
  }),
  */

  // 3rd method (recommended) : where config details will be kept from .env file
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [__dirname + "/**/*.entity{.ts,.js}" ],
        // providing dir for entity files, __dirname -> current directory, /**/ => check nested dirs too, *.entity{.ts,.js} => file with name something.entity.ts or something.entity.js. In production code all .ts file will be converted into .js so we should mention .js too.
      synchronize: configService.get<boolean>('DB_SYNC'),
        // synchronize: true (sync/map entity with respective table in db )
        // when app run for the first time it will create table for respective entity in respective db 
      logging: true,
        // show db query (sql query) logs in console on every sync
    }),
    inject: [ConfigService],
  }),
  DemoModule,
  UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
