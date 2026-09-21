import { Module } from '@nestjs/common';
import { NaskahController } from './naskah.controller';
import { NaskahService } from './naskah.service';

@Module({
  controllers: [NaskahController],
  providers: [NaskahService],
  exports: [NaskahService],
})
export class NaskahModule {}
