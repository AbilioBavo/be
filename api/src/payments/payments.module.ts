import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MpesaGateway } from './gateways/mpesa.gateway';
import { OfflineGateway } from './gateways/offline.gateway';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, MpesaGateway, OfflineGateway, PrismaService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
