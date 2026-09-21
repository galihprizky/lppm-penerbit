import { Module } from '@nestjs/common';
import { PenugasanReviewerController } from './penugasan-reviewer.controller';
import { PenugasanReviewerService } from './penugasan-reviewer.service';

@Module({
  controllers: [PenugasanReviewerController],
  providers: [PenugasanReviewerService],
  exports: [PenugasanReviewerService],
})
export class PenugasanReviewerModule {}
