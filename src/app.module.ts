import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { UserService } from './users/users.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [],
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
    UserService,
  ],
})
export class AppModule {}
