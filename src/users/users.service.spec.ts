import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersController } from './users.controller';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
