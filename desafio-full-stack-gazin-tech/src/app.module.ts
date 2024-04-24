import { Module } from '@nestjs/common';
import { DeveloperModule } from './app/use-cases/developer/developer.module';
import { LevelModule } from './app/use-cases/level/level.module';

@Module({
  imports: [LevelModule, DeveloperModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
