import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 'clu123abc456',
  })
  id!: string;

  @ApiProperty({
    description: 'URL-friendly version of the product name',
    example: 'awesome-product',
  })
  slug!: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Awesome Product',
  })
  title!: string;

  @ApiProperty({
    description: 'Product subtitle',
    example: 'The best product ever',
    required: false,
    nullable: true,
  })
  subtitle!: string | null;

  @ApiProperty({
    description: 'Detailed product description',
    example: 'This is an amazing product that you will love',
  })
  description!: string;

  @ApiProperty({
    description: 'Product price in cents',
    example: 2999,
  })
  priceCents!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
    default: 'USD',
  })
  currency!: string;

  @ApiProperty({
    description: 'Primary product image URL',
    example: 'https://example.com/image.jpg',
    required: false,
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    description: 'Array of additional product images',
    type: [String],
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    default: [],
  })
  gallery!: string[];

  @ApiProperty({
    description: 'Available stock quantity',
    example: 50,
    default: 0,
  })
  stock!: number;

  @ApiProperty({
    description: 'Whether the product is active and available for purchase',
    example: true,
    default: true,
  })
  active!: boolean;

  @ApiProperty({
    description: 'Product creation timestamp',
    example: '2024-08-24T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Product last update timestamp',
    example: '2024-08-24T12:45:00Z',
  })
  updatedAt!: Date;
}
