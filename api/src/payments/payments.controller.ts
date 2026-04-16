import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from '../generated/prisma/enums';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':orderId/initiate')
  initiate(
    @Param('orderId') orderId: string,
    @Body('method') method: PaymentMethod,
  ) {
    //console.log(`Received payment initiation request for order ${orderId} with method ${method}`);
    return this.paymentsService.initiatePayment(orderId, method);
  }
  /*@Post('webhook/mpesa')
  webhook(@Body() payload: any) {
    return this.paymentsService.handleMpesaWebhook(payload);
  }*/
}
