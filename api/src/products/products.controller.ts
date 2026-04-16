import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('SUPPLIER')
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.userId, createProductDto);
  }
  //c268f38f-465a-496b-af39-70cb397e400d

  @Patch('update/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('SUPPLIER')
  update(@Request() req, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(req.user.userId, id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('SUPPLIER')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
  @Post('/category/create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  createCategory(@Request() req, @Body() category: CreateCategoryDto) {
    return this.productsService.createCategory(req.user.userId, category);
  }
  @Get()
  findAll() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
  @Get('/category/:name')
  getProductsByCategory(@Param('name') slug: string) {
    return this.productsService.getProductsByCategory(slug);
  }
  @Delete('/deactivate/:id')
  deactivateProduct(@Param('id') id: string) {
    return this.productsService.deactivateProduct(id);
  }
  @Get('/supplier/:id')
  getProductsBySupplier(@Param('id') supplierId: string) {
    return this.productsService.getProductsBySupplier(supplierId);
  }
}
