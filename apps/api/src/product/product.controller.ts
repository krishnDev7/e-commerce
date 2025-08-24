import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ErrorResponseDto } from '../common/dto/error.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieves all active products ordered by creation date (newest first)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all active products',
    type: [ProductDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  list(): Promise<ProductDto[]> {
    return this.service.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieves a specific product by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique product identifier',
    example: 'clu123abc456',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the product',
    type: ProductDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  get(@Param('id') id: string): Promise<ProductDto | null> {
    return this.service.get(id);
  }
}
