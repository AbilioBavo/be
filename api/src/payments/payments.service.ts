import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MpesaGateway } from './gateways/mpesa.gateway';
import { OfflineGateway } from './gateways/offline.gateway';
import { PaymentMethod, PaymentStatus } from '../generated/prisma/enums';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mpesaGateway: MpesaGateway,
    private readonly offlineGateway: OfflineGateway,
  ) {}

  async initiatePayment(orderId: string, method: PaymentMethod) {
    console.log('initiatePayment called with orderId:', orderId, 'and method:', method);
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { client: true },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const gateway =
      method === PaymentMethod.MOBILE_MONEY
        ? this.mpesaGateway
        : this.offlineGateway;

    const response = await gateway.initiatePayment({
      orderId,
      amount: order.totalAmount,
      currency: 'MZN',
      customerPhone: order.client.phone || '857483995',
    });
    console.log('Payment initiation response:', response);

    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        method,
        status: response.success ? PaymentStatus.PENDING : PaymentStatus.FAILED,
        amount: order.totalAmount,
        currency: 'MZN',
        providerRef: response.transactionId || crypto.randomUUID(),
      },
    });

    return payment;
  }

  async confirmPayment(orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { orderId },
        data: {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED',
        },
      });

      return { success: true };
    });
  }
}
