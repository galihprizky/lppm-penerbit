import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { FakultasModule } from './fakultas/fakultas.module';
import { JurusanModule } from './jurusan/jurusan.module';
import { NaskahModule } from './naskah/naskah.module';
import { RolesModule } from './roles/roles.module';
import { PenugasanReviewerModule } from './penugasan-reviewer/penugasan-reviewer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MahasiswaModule,
    FakultasModule,
    JurusanModule,
    NaskahModule,
    RolesModule,
    PenugasanReviewerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}