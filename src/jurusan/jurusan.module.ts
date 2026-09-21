import { Module } from '@nestjs/common';
import { JurusanController } from './jurusan.controller';
import { JurusanService } from './jurusan.service';

@Module({
  controllers: [JurusanController],
  providers: [JurusanService],
  exports: [JurusanService],
})
export class JurusanModule {}
