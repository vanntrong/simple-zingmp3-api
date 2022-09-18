import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MusicModule } from './modules/music/music.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UserModule, MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}