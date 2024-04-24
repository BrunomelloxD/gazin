import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { LevelRepository } from './repositories/level.repository';

@Module({
  controllers: [LevelController],
  providers: [PrismaService, LevelRepository, LevelService],
})
export class LevelModule {}
