import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DeveloperDTO {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  nivel: number | string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsDate()
  datanascimento: Date | string;

  @IsNotEmpty()
  @IsInt()
  idade: number;

  @IsNotEmpty()
  @IsString()
  hobby: string;
}
