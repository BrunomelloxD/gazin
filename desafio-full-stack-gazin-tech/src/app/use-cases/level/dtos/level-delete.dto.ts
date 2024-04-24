import { IsNotEmpty, IsString } from 'class-validator';

export class LevelDeleteDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}
