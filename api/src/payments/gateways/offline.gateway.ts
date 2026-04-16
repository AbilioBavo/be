import { Injectable } from '@nestjs/common';
import {
  IPaymentGateway,
  PaymentInitiationData,
  PaymentInitiationResponse,
  RefundResponse,
} from './payment-gateway.interface';

@Injectable()
export class OfflineGateway implements IPaymentGateway {
  async initiatePayment(
    data: PaymentInitiationData,
  ): Promise<PaymentInitiationResponse> {
    return {
      success: true,
      message: 'Aguardando comprovativo',
    };
  }

  async processWebhook(): Promise<any> {
    throw new Error('Offline payment has no webhook');
  }

  async refund(): Promise<RefundResponse> {
    return {
      success: true,
      message: 'Refund manual',
    };
  }
}