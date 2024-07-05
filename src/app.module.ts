import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserService } from './users/users.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersController } from './users/users.controller';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [],
      },
    }),
    ContentModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    UserService,
  ],
})
export class AppModule {}
