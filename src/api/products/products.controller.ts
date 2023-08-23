import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductWithId,
  CreateProductDto,
  UpdateProductDto,
} from './products.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Product has been successfully created.',
    type: ProductWithId,
  })
  createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.createOne(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [ProductWithId],
  })
  findProducts() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  @ApiResponse({
    status: 200,
    type: ProductWithId,
  })
  findProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Put(':productId')
  @ApiResponse({
    status: 200,
    type: ProductWithId,
  })
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateOne(productId, data);
  }

  @Delete(':productId')
  @ApiNoContentResponse({
    description: 'Product has been successfully deleted.',
  })
  @HttpCode(204)
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.deleteOne(productId);
  }
}
