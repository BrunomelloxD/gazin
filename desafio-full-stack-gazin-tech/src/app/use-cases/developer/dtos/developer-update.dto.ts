import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DeveloperUpdateParamDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class DeveloperUpdateDTO {
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
