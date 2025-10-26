import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UserModule } from './modules/user/user.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [AuthModule, UsersModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
