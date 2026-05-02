import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { InterestModule } from './modules/interest/interest.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, SkillModule, InterestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
