import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StorageModuleModule } from './storage-module/storage-module.module';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ UsersModule, AuthModule, StorageModuleModule, MailModule, ProductsModule, OrdersModule, PaymentsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
