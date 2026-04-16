import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, clientId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: createOrderDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const freightCost = 100; // example
    /*const totalAmount =
      product.pricePerUnit * createOrderDto.quantity + freightCost;*/

    const subtotal = product.pricePerUnit * createOrderDto.quantity;
    const urgencySurcharge = 0; // or calculate if needed
    const totalAmount = subtotal + freightCost + urgencySurcharge;

    // const order = await this.prisma.order.create({
    //   data: {
    //     ...createOrderDto,
    //     clientId,
    //     supplierId: product.supplierId,
    //     unitPriceSnapshot: product.pricePerUnit,
    //     status: 'PENDING',
    //     freightCost,
    //     subtotal,
    //     urgencySurcharge,
    //     totalAmount,
    //   },
    //   select: {
    //     id: true,
    //     productId: true,
    //     quantity: true,
    //   },
    // });

    return {
      message: 'Order created successfully',
      status: 'success',
      // data: order,
    };
  }

  async findAll(userId: string, role: string) {
    if (role.toUpperCase() === 'CLIENT') {
      return this.prisma.order.findMany({
        where: { clientId: userId },
        include: {
          product: true,
          supplier: true,
          delivery: true,
          payment: true,
          reviews: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (role.toUpperCase() === 'SUPPLIER') {
      return this.prisma.order.findMany({
        where: { supplierId: userId },
        include: {
          product: true,
          client: true,
          delivery: true,
          payment: true,
          reviews: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (role.toUpperCase() === 'ADMIN') {
      return this.prisma.order.findMany({
        include: {
          product: true,
          client: true,
          supplier: true,
          delivery: true,
          payment: true,
          reviews: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      throw new Error('Invalid role');
    }
  }

  async getOrderById(orderId: string, userId: string, role: string) {
    if (!orderId) {
      throw new NotFoundException('Order ID is required');
    }

    let order;

    if (role === 'CLIENT') {
      order = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          clientId: userId,
        },
        include: {
          product: true,
          payment: true,
          delivery: true,
          invoice: true,
          history: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found for this client');
      }
    } else if (role === 'SUPPLIER') {
      order = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          supplierId: userId,
        },
        include: {
          product: true,
          client: {
            select: {
              id: true,
              email: true,
            },
          },
          payment: true,
          delivery: true,
          history: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found for this supplier');
      }
    } else if (role === 'ADMIN') {
      order = await this.prisma.order.findFirst({
        where: {
          id: orderId,
        },
        include: {
          product: true,
          client: true,
          supplier: true,
          payment: true,
          delivery: true,
          invoice: true,
          history: true,
          reviews: true,
          disputes: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }
    } else {
      throw new UnauthorizedException('Invalid role');
    }

    return order;
  }
  async getOrderHistory(orderId: string, userId: string, role: string) {
    let order;

    switch (role) {
      case 'ADMIN':
        order = await this.prisma.order.findUnique({
          where: { id: orderId },
          select: { id: true },
        });
        break;

      case 'CLIENT':
        order = await this.prisma.order.findFirst({
          where: {
            id: orderId,
            clientId: userId,
          },
          select: { id: true },
        });
        break;

      case 'SUPPLIER':
        order = await this.prisma.order.findFirst({
          where: {
            id: orderId,
            supplier: {
              userId: userId,
            },
          },
          select: { id: true },
        });
        break;

      default:
        throw new ForbiddenException('Unauthorized role');
    }

    if (!order) {
      throw new NotFoundException('Order not found or access denied');
    }

    return this.prisma.orderStatusHistory.findMany({
      where: {
        orderId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
  async confirmOrder(orderId: string, supplierId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId, supplierId },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'CONFIRMED';
    await this.prisma.order.update({
      where: { id: orderId },
      data: order,
    });
  }
  async cancelOrder(orderId: string, userId: string, role: string) {
    if (role === 'SUPPLIER') {
      throw new ForbiddenException('Suppliers cannot cancel orders');
    }
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
        OR: [{ clientId: userId }, { client: { role: 'ADMIN' } }],
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'CANCELLED';
    await this.prisma.order.update({
      where: { id: orderId },
      data: order,
    });
  }
  /*update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }*/
}
