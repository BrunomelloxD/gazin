import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperCreateDTO } from './dtos/developer-create.dto';
import { DeveloperDeleteDTO } from './dtos/developer-delete.dto';

@Controller('/api/desenvolvedores')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Patch('/:id')
  async update(
    @Param() param: DeveloperDeleteDTO,
    @Body() data: DeveloperCreateDTO,
  ) {
    if (!(await this.developerService.exists(param.id))) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }

    if (!(await this.developerService.levelExists(data.nivel))) {
      throw new NotFoundException('Nivel não encontrado');
    }

    return await this.developerService.update(param, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() data: DeveloperDeleteDTO) {
    if (!(await this.developerService.exists(data.id))) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }

    return await this.developerService.delete(data);
  }

  @Get()
  async getAll() {
    const developers = await this.developerService.getAll();

    if (!developers || !developers.length) {
      throw new NotFoundException('Nenhum desenvolvedor encontrado');
    }

    return developers;
  }

  @Post()
  async create(@Body() data: DeveloperCreateDTO) {
    return await this.developerService.create(data);
  }
}
