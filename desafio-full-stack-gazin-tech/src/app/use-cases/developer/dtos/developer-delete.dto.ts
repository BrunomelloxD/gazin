import { IsNotEmpty, IsString } from 'class-validator';

export class DeveloperDeleteDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
