import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
      // by making it true we can use this config module throughout the application (for every further modules created). If its false we must import config module in every modules manually (like here we did)
    envFilePath: ".local.env"
    // envFilePath: ".prod.env"
      // if not mentioned, then default path for env file would be ".env"

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
