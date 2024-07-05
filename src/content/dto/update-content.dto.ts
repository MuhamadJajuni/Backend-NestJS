import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: number;
}
