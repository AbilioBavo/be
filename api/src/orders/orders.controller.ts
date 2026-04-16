import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  @Roles('CLIENT')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  findAll(@Req() req) {
    return this.ordersService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('CLIENT', 'SUPPLIER', 'ADMIN')
  findOne(@Req() req, @Param('id') id: string) {
    return this.ordersService.getOrderById(id, req.user.userId, req.user.role);
  }
  @Get(':id/history')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('CLIENT', 'SUPPLIER', 'ADMIN')
  getOrderHistory(@Param('id') id: string, @Req() req) {
    return this.ordersService.getOrderHistory(id, req.user.userId, req.user.role);
  }
  @Patch(':id/confirm')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('SUPPLIER')
  confirmOrder(@Param('id') id: string, @Req() req) {
    return this.ordersService.confirmOrder(id, req.user.userId);
  }
  @Patch(':id/cancel')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('CLIENT', 'SUPPLIER', 'ADMIN')
  cancelOrder(@Param('id') id: string, @Req() req) {
    return this.ordersService.cancelOrder(id, req.user.userId, req.user.role);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }*/
}
