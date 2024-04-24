import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DeveloperCreateDTO {
  @IsNotEmpty()
  @IsInt()
  nivel: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsString()
  datanascimento: string;

  @IsNotEmpty()
  @IsString()
  hobby: string;
}
