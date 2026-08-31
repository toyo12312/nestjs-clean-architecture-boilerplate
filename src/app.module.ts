import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './core/app.controller';
import { AppService } from './core/app.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
