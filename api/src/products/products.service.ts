import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(userId: string, createProductDto: CreateProductDto) {
    console.log('Creating product for user ID: ', userId);
    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { userId: userId },
    });

    /*if (supplier?.role !== 'SUPPLIER') {
      throw new NotFoundException('Supplier not found');
    }*/
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    }).then(category => {
      if (!category) {
        throw new NotFoundException('Category not found');
      }}).catch(error => {
        throw error;
      });
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        supplierId: supplier.id,
      },
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    // 1. Primeiro, procuramos o perfil de fornecedor associado ao utilizador
    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });

    if (!supplier) {
      throw new NotFoundException('Utilizador não possui perfil de fornecedor.');
    }

    // 2. Usamos updateMany com filtros para garantir a posse (ownership)
    // Isso evita ter de fazer um 'findUnique' extra para o produto
    const updated = await this.prisma.product.updateMany({
      where: {
        id: productId,
        supplierId: supplier.id, // Só atualiza se o produto for deste fornecedor
      },
      data: updateProductDto,
    });

    // 3. Se o count for 0, o produto não existe ou não pertence a este fornecedor
    if (updated.count === 0) {
      throw new NotFoundException(
        'Produto não encontrado ou sem permissão para editar.',
      );
    }

    return { message: 'Produto atualizado com sucesso' };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async createCategory(userId: string, category: CreateCategoryDto) {
    const admin = await this.prisma.user.findFirst({
      where: {
        id: userId,
        role: 'ADMIN',
      },
    });

    if (!admin) {
      throw new NotFoundException(
        'Utilizador não possui perfil de administrador.',
      );
    }
    const slug = category.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s-]/g, "")       // Remove caracteres especiais
      .replace(/\s+/g, "-");

    return this.prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        slug,
        isActive: true,
      },
    });
  }
  async findAllCategories() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
      },
    });
  }
  async findOneCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
  }
  async updateCategory(id: string, category: CreateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: category.name,
        description: category.description,
      },
    });
  }
  async getProductsByCategory(categoryName: string) {
    return this.prisma.category.findMany({
      where: { slug: categoryName },
      include: {
        products: {
          include: {
            supplier: true,
          },
        },
      },
    });
  }
  async getProductsBySupplier(supplierId: string) {
    return this.prisma.product.findMany({
      where: { supplierId },
    });
  }
  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
      },
    });
  }
  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  async deactivateProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
