import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class LevelDTO {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  nivel: string;
}
