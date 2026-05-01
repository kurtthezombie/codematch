import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule, 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// disable middleware for now
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude('auth/login', 'auth/signup')
//       .forRoutes('*');
//   }
// }
