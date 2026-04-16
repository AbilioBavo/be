import { Injectable, InternalServerErrorException } from '@nestjs/common';
import crypto from 'crypto';
import constants from 'constants';
import {
  IPaymentGateway,
  PaymentInitiationData,
  PaymentInitiationResponse,
  RefundResponse,
  WebhookProcessingResult,
} from './payment-gateway.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MpesaGateway implements IPaymentGateway {
  private readonly apiBaseUrl = process.env.MPESA_API_BASE_URL!;
  private readonly apiKey = process.env.MPESA_API_KEY!;
  private readonly publicKey = process.env.MPESA_PUBLIC_KEY!;
  private readonly serviceProviderCode =
    process.env.MPESA_SERVICE_PROVIDER_CODE!;

  async initiatePayment(
    data: PaymentInitiationData,
  ): Promise<PaymentInitiationResponse> {
    try {
        console.log('Generating bearer token for M-Pesa API');
      const token = this.generateBearerToken(this.apiKey, this.publicKey);
        console.log('Bearer token generated successfully');
      const payload = {
        input_TransactionReference: data.orderId.substring(0, 20),
        input_CustomerMSISDN: data.customerPhone?.replace(/\D/g, ''),
        input_Amount: data.amount,
        input_ThirdPartyReference: `ORDER${data.orderId}`.substring(0, 20),
        input_ServiceProviderCode: this.serviceProviderCode,
      };
      console.log('Initiating M-Pesa payment with payload:', payload);

      const response = await fetch(
        `${this.apiBaseUrl}:18352/ipg/v1x/c2bPayment/singleStage/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: 'https://developer.mpesa.vm.co.mz',
          },
          body: JSON.stringify(payload),
        },
      );
      console.log('M-Pesa API response status:', response.status);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(result) || response.statusText);
      }

      return {
        success: true,
        transactionId: result.output_TransactionID,
        code: result.output_ResponseCode,
        message: 'Pagamento iniciado com sucesso',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async processWebhook(payload: any): Promise<WebhookProcessingResult> {
    const orderId = payload.input_ThirdPartyReference;
    let status: 'success' | 'failed' | 'pending' = 'pending';

    if (payload.transactionStatus === 'Success') status = 'success';
    if (payload.transactionStatus === 'Failed') status = 'failed';

    return { success: true, orderId, status };
  }

  async refund(transactionId: string, amount: number): Promise<RefundResponse> {
    return {
      success: false,
      message: 'M-Pesa refund requires manual B2C flow',
    };
  }

  private generateBearerToken(apiKey: string, publicKey: string): string {
    const formattedKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    console.log('Encrypting API key for M-Pesa authentication');

    const encrypted = crypto.publicEncrypt(
      {
        key: formattedKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(apiKey),
    );
    //console.log('API key encrypted successfully', { encrypted: encrypted.toString('base64') });
    return encrypted.toString('base64');
  }
}
