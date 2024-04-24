import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/infra/database/prisma.service';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { DeveloperRepository } from './repositories/developer.repository';

@Module({
  controllers: [DeveloperController],
  providers: [PrismaService, DeveloperRepository, DeveloperService],
})
export class DeveloperModule {}
