import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DemoModule } from './demo/demo.module';

import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
      // by making it true we can use this config module throughout the application (for every further modules created). If its false we must import config module in every modules manually (like here we did)
    envFilePath: ".local.env"
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
      entities: [],
      synchronize: configService.get<boolean>('DB_SYNC'),
    }),
    inject: [ConfigService],
  }),
  DemoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
