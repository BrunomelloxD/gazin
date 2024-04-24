import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { DeveloperCreateDTO } from '../dtos/developer-create.dto';
import { DeveloperDeleteDTO } from '../dtos/developer-delete.dto';
import {
  DeveloperUpdateDTO,
  DeveloperUpdateParamDTO,
} from '../dtos/developer-update.dto';
import { DeveloperDTO } from '../dtos/developer.dto';

@Injectable()
export class DeveloperRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async update(param: DeveloperUpdateParamDTO, data: DeveloperUpdateDTO) {
    const age = this._calculateAge(data.datanascimento);
    const birthday = new Date(data.datanascimento);
    return await this.prismaService.developer.update({
      where: {
        id: +param.id,
      },
      data: {
        nivel: +data.nivel,
        nome: data.nome,
        sexo: data.sexo,
        datanascimento: birthday,
        idade: age,
        hobby: data.hobby,
      },
    });
  }

  async delete(data: DeveloperDeleteDTO) {
    return await this.prismaService.developer.delete({
      where: {
        id: +data.id,
      },
    });
  }

  async getAll(): Promise<DeveloperDTO[]> {
    const developers = await this.prismaService.developer.findMany({
      select: {
        id: true,
        nivel: true,
        nome: true,
        sexo: true,
        datanascimento: true,
        idade: true,
        hobby: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const levels = await this.prismaService.level.findMany({
      select: {
        id: true,
        nivel: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const result = developers.map((developer) => ({
      id: developer.id,
      nivel: levels.find((level) => level.id === developer.nivel)?.nivel,
      nome: developer.nome,
      sexo: developer.sexo,
      datanascimento: format(new Date(developer.datanascimento), 'yyyy-MM-dd'),
      idade: developer.idade,
      hobby: developer.hobby,
    }));

    return result;
  }

  async create(data: DeveloperCreateDTO): Promise<DeveloperDTO> {
    const age = this._calculateAge(data.datanascimento);
    const birthday = new Date(data.datanascimento);
    return await this.prismaService.developer.create({
      data: {
        nivel: +data.nivel,
        nome: data.nome,
        sexo: data.sexo,
        datanascimento: birthday,
        idade: age,
        hobby: data.hobby,
      },
    });
  }

  private _calculateAge(birthday: string): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
