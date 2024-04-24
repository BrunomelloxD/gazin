import {
  BadRequestException,
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
import { LevelCreateDTO } from './dtos/level-create.dto';
import { LevelUpdateParamDTO } from './dtos/level-update.dto';
import { LevelService } from './level.service';

@Controller('api/niveis')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  async create(@Body() data: LevelCreateDTO) {
    return await this.levelService.create(data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() param: LevelUpdateParamDTO) {
    if (!(await this.levelService.exists(param.id))) {
      throw new NotFoundException('Nivel não encontrado');
    }

    if (await this.levelService.levelExistsOnDeveloper(param.id)) {
      throw new BadRequestException('Nível associado a um desenvolvedor');
    }

    return await this.levelService.delete(param);
  }

  @Get()
  async getAll() {
    const levels = await this.levelService.getAll();

    if (!levels || !levels.length) {
      throw new NotFoundException('Nenhum nivel encontrado');
    }

    return levels;
  }

  @Patch('/:id')
  async update(
    @Param() param: LevelUpdateParamDTO,
    @Body() data: LevelCreateDTO,
  ) {
    if (!(await this.levelService.exists(param.id))) {
      throw new NotFoundException('Nivel não encontrado');
    }

    return await this.levelService.update(data, param);
  }
}
