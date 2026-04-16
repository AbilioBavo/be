export interface PaymentInitiationData {
  orderId: string;
  amount: number;
  currency: string;
  customerPhone?: string;
}

export interface PaymentInitiationResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  code?: string;
}

export interface WebhookProcessingResult {
  success: boolean;
  orderId: string;
  status: 'success' | 'failed' | 'pending';
}

export interface RefundResponse {
  success: boolean;
  message?: string;
}

export interface IPaymentGateway {
  initiatePayment(
    data: PaymentInitiationData,
  ): Promise<PaymentInitiationResponse>;

  processWebhook(payload: any): Promise<WebhookProcessingResult>;

  refund(
    transactionId: string,
    amount: number,
  ): Promise<RefundResponse>;
}