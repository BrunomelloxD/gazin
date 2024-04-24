import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { LevelCreateDTO } from '../dtos/level-create.dto';
import { LevelDeleteDTO } from '../dtos/level-delete.dto';
import { LevelUpdateParamDTO } from '../dtos/level-update.dto';
import { LevelDTO } from '../dtos/level.dto';

@Injectable()
export class LevelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<LevelDTO[]> {
    return await this.prismaService.level.findMany({
      select: {
        id: true,
        nivel: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async update(
    data: LevelCreateDTO,
    param: LevelUpdateParamDTO,
  ): Promise<LevelDTO> {
    return await this.prismaService.level.update({
      where: {
        id: +param.id,
      },
      data: {
        nivel: data.nivel,
      },
    });
  }

  async create(data: LevelCreateDTO): Promise<LevelDTO> {
    return await this.prismaService.level.create({
      data: {
        nivel: data.nivel,
      },
    });
  }

  async delete(data: LevelDeleteDTO): Promise<LevelDTO> {
    return await this.prismaService.level.delete({
      where: {
        id: +data.id,
      },
    });
  }
}
