'use client';

import { Grid, GridItem, Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { CategoriesGridSkeleton } from '@ecommerce/ui';
import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    imageUrl:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 156,
  },
  {
    id: '2',
    name: 'Fashion',
    imageUrl:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 234,
  },
  {
    id: '3',
    name: 'Home & Garden',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 98,
  },
  {
    id: '4',
    name: 'Books',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 87,
  },
  {
    id: '5',
    name: 'Sports',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 142,
  },
  {
    id: '6',
    name: 'Beauty',
    imageUrl:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 73,
  },
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CategoriesGridSkeleton count={6} />;
  }

  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={6}
    >
      {categories.map((category) => (
        <GridItem key={category.id}>
          <Box
            bg={bgColor}
            borderRadius="xl"
            overflow="hidden"
            shadow="sm"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
              shadow: 'lg',
              transform: 'translateY(-4px)',
              bg: hoverBg,
            }}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              height="120px"
              width="100%"
              objectFit="cover"
            />
            <Box p={4} textAlign="center">
              <Text fontWeight="semibold" fontSize="sm" mb={1}>
                {category.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {category.productCount} products
              </Text>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}
