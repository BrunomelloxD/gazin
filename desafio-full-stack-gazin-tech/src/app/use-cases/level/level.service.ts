import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { LevelCreateDTO } from './dtos/level-create.dto';
import { LevelDeleteDTO } from './dtos/level-delete.dto';
import { LevelUpdateParamDTO } from './dtos/level-update.dto';
import { LevelDTO } from './dtos/level.dto';
import { LevelRepository } from './repositories/level.repository';

@Injectable()
export class LevelService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly levelRepository: LevelRepository,
  ) {}

  async getAll(): Promise<LevelDTO[]> {
    return await this.levelRepository.getAll();
  }

  async delete(data: LevelDeleteDTO): Promise<LevelDTO> {
    return await this.levelRepository.delete(data);
  }

  async exists(id: string): Promise<boolean> {
    const level = await this.prismaService.level.findUnique({
      where: {
        id: +id,
      },
    });

    return !!level;
  }

  async levelExistsOnDeveloper(data: string): Promise<boolean> {
    const levelId = +data;
    const developer = await this.prismaService.developer.findMany({
      where: {
        nivel: levelId,
      },
    });

    return !!developer.length;
  }

  async update(
    data: LevelCreateDTO,
    param: LevelUpdateParamDTO,
  ): Promise<LevelDTO> {
    return await this.levelRepository.update(data, param);
  }

  async create(data: LevelCreateDTO): Promise<LevelDTO> {
    return await this.levelRepository.create(data);
  }
}
