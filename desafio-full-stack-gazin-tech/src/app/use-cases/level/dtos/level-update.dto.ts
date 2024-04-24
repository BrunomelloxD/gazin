import { IsNotEmpty, IsString } from 'class-validator';

export class LevelCreateDTO {
  @IsNotEmpty()
  @IsString()
  nivel: string;
}

export class LevelUpdateParamDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}
