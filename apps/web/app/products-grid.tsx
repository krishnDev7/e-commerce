'use client';

import { useQuery } from './query';
import {
  getProductListBuilder,
  ProductDTO,
  ProductListResponse,
  ProductListParams,
} from '@ecommerce/api-client';
import { Grid, GridItem, Box, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { ProductCard, ProductGridSkeleton, Product } from '@ecommerce/ui';

export default function ProductsGrid() {
  const { data, isLoading, error } = useQuery<ProductListParams, ProductListResponse>(
    getProductListBuilder,
    {},
  );

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product);
    // TODO: Implement add to cart functionality
  };

  const handleToggleWishlist = (product: Product) => {
    console.log('Toggle wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const handleViewDetails = (product: Product) => {
    console.log('View details:', product);
    // TODO: Navigate to product detail page
  };

  // Convert ProductDTO to Product interface
  const convertToProduct = (productDto: ProductDTO): Product => ({
    id: productDto.id,
    name: productDto.title,
    description: productDto.subtitle || undefined,
    price: productDto.priceCents / 100,
    imageUrl:
      productDto.imageUrl ||
      `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
    imageAlt: productDto.title,
    category: 'General', // Default category since it's not in the DTO
    inStock: productDto.stock > 0,
    isNew: Math.random() > 0.7, // Random new badge for demo
    isOnSale: Math.random() > 0.8, // Random sale badge for demo
    originalPrice: Math.random() > 0.8 ? (productDto.priceCents / 100) * 1.2 : undefined,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating between 3-5
    reviewCount: Math.floor(Math.random() * 200) + 10, // Random review count
  });

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        Failed to load products. Please try again later.
      </Alert>
    );
  }

  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  const products = data?.products?.map(convertToProduct) || [];

  if (products.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="gray.500" mb={2}>
          No products found
        </Text>
        <Text color="gray.400">We'll add some amazing products soon!</Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={6}
    >
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onViewDetails={handleViewDetails}
            isInWishlist={Math.random() > 0.8} // Random wishlist status for demo
          />
        </GridItem>
      ))}
    </Grid>
  );
}
