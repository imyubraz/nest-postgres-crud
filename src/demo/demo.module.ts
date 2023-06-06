import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})

export class DemoModule {
    constructor(private readonly configService: ConfigService){
        // method 1 of accessing env variables
        console.log(process.env.PORT);

        // method 2 of accessing env variables (if isGlobal was not set true in app module )
        console.log("PORT accessed from Demo Module : " + configService.get<Number>("PORT"));
    }
}
