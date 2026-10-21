import { Module } from '@nestjs/common';
import { HasilReviewController } from './hasil-review.controller';
import { HasilReviewService } from './hasil-review.service';

@Module({
  controllers: [HasilReviewController],
  providers: [HasilReviewService],
})
export class HasilReviewModule {}
