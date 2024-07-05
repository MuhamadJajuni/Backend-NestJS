import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: number;
}
