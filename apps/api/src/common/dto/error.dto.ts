import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Product not found',
  })
  message!: string;

  @ApiProperty({
    description: 'Error type/code',
    example: 'Not Found',
  })
  error!: string;
}

export class ValidationErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Array of validation error messages',
    example: ['id must be a string', 'id should not be empty'],
  })
  message!: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error!: string;
}
