import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription(
      `
      The E-Commerce API provides endpoints for managing products, orders, and users.
      
      ## Features
      - Product management and catalog browsing
      - User authentication and profiles
      - Order processing and management
      - Category-based product organization
      
      ## Authentication
      Currently, the API is open for development purposes. Authentication will be added in future versions.
      
      ## Base URL
      All API endpoints are prefixed with \`/api\`
      
      ## Data Format
      - All dates are returned in ISO 8601 format
      - Prices are stored and returned in cents (e.g., $29.99 = 2999 cents)
      - All endpoints return JSON responses
    `,
    )
    .setVersion('1.0.0')
    .addTag(
      'products',
      'Product catalog operations - browse, search, and retrieve product information',
    )
    .setContact(
      'E-Commerce Team',
      'https://github.com/your-org/e-commerce',
      'support@ecommerce.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3001', 'Development server')
    .addServer('https://api.ecommerce.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'E-Commerce API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper { display: none }
      .swagger-ui .info .title { color: #3b82f6 }
    `,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  // Configure CORS with more flexible settings for development
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['http://localhost:3000'] // Restrict in production
        : true, // Allow all origins in development
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`API Server running on http://localhost:${port}`);
}

bootstrap();
