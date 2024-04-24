import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { DeveloperCreateDTO } from './dtos/developer-create.dto';
import { DeveloperDeleteDTO } from './dtos/developer-delete.dto';
import {
  DeveloperUpdateDTO,
  DeveloperUpdateParamDTO,
} from './dtos/developer-update.dto';
import { DeveloperDTO } from './dtos/developer.dto';
import { DeveloperRepository } from './repositories/developer.repository';

@Injectable()
export class DeveloperService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly developerRepository: DeveloperRepository,
  ) {}

  async update(param: DeveloperUpdateParamDTO, data: DeveloperUpdateDTO) {
    return await this.developerRepository.update(param, data);
  }

  async levelExists(id: number): Promise<boolean> {
    const level = await this.prismaService.level.findUnique({
      where: {
        id: id,
      },
    });

    return !!level;
  }

  async exists(id: string): Promise<boolean> {
    const developer = await this.prismaService.developer.findUnique({
      where: {
        id: +id,
      },
    });

    return !!developer;
  }

  async delete(data: DeveloperDeleteDTO) {
    return await this.developerRepository.delete(data);
  }

  async getAll(): Promise<DeveloperDTO[]> {
    return await this.developerRepository.getAll();
  }

  async create(data: DeveloperCreateDTO): Promise<DeveloperDTO> {
    return await this.developerRepository.create(data);
  }
}
