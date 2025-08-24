'use client';

import {
  Container,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Image,
  Badge,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { CategoriesGridSkeleton } from '@ecommerce/ui';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CategoryDetail {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  subcategories?: string[];
}

const mockCategories: CategoryDetail[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets, smartphones, laptops, and electronic accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 156,
    subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Cameras'],
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing, shoes, and accessories for all styles',
    imageUrl:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 234,
    subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes', 'Accessories'],
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Furniture, decor, appliances, and garden essentials',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 98,
    subcategories: ['Furniture', 'Home Decor', 'Kitchen', 'Garden'],
  },
  {
    id: '4',
    name: 'Books',
    description: 'Fiction, non-fiction, educational, and digital books',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 87,
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'E-books'],
  },
  {
    id: '5',
    name: 'Sports & Fitness',
    description: 'Sports equipment, fitness gear, and outdoor activities',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 142,
    subcategories: ['Fitness Equipment', 'Sports Gear', 'Outdoor', 'Activewear'],
  },
  {
    id: '6',
    name: 'Beauty & Personal Care',
    description: 'Skincare, makeup, fragrances, and personal care products',
    imageUrl:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 73,
    subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Hair Care'],
  },
  {
    id: '7',
    name: 'Health & Wellness',
    description: 'Vitamins, supplements, and wellness products',
    imageUrl:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 65,
    subcategories: ['Vitamins', 'Supplements', 'Medical Devices', 'Wellness'],
  },
  {
    id: '8',
    name: 'Toys & Games',
    description: 'Toys, board games, puzzles, and entertainment for all ages',
    imageUrl:
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    productCount: 89,
    subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational'],
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Categories</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Header */}
        <Box textAlign="center" py={8}>
          <Heading size="2xl" mb={4} color="secondary.800">
            Shop by Category
          </Heading>
          <Text fontSize="lg" color="secondary.600" maxW="2xl" mx="auto">
            Discover our wide range of products across different categories. Find exactly what
            you're looking for in our carefully curated collections.
          </Text>
        </Box>

        {/* Categories Grid */}
        {isLoading ? (
          <CategoriesGridSkeleton count={8} />
        ) : (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
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
                  border="1px"
                  borderColor={borderColor}
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    shadow: 'lg',
                    transform: 'translateY(-4px)',
                    bg: hoverBg,
                  }}
                  as={Link}
                  href={`/categories/${category.id}`}
                >
                  {/* Category Image */}
                  <Box position="relative">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="brand"
                      fontSize="sm"
                      px={2}
                      py={1}
                    >
                      {category.productCount} items
                    </Badge>
                  </Box>

                  {/* Category Info */}
                  <Box p={6}>
                    <VStack align="stretch" spacing={3}>
                      <Heading size="md" color="secondary.800">
                        {category.name}
                      </Heading>
                      <Text fontSize="sm" color="secondary.600" noOfLines={2}>
                        {category.description}
                      </Text>

                      {category.subcategories && (
                        <Box>
                          <Text fontSize="xs" color="secondary.500" mb={2}>
                            Popular:
                          </Text>
                          <SimpleGrid columns={2} spacing={1}>
                            {category.subcategories.slice(0, 4).map((sub, index) => (
                              <Text key={index} fontSize="xs" color="brand.500">
                                • {sub}
                              </Text>
                            ))}
                          </SimpleGrid>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}

        {/* Popular Categories Section */}
        <Box py={16} bg="gray.50" borderRadius="xl" px={8}>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading size="lg" mb={2}>
                Most Popular Categories
              </Heading>
              <Text color="secondary.600">Browse our top-selling categories</Text>
            </Box>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} width="100%">
              {categories.slice(0, 4).map((category) => (
                <Box
                  key={category.id}
                  as={Link}
                  href={`/categories/${category.id}`}
                  textAlign="center"
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  shadow="sm"
                  transition="all 0.2s"
                  _hover={{
                    shadow: 'md',
                    transform: 'translateY(-2px)',
                  }}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    boxSize="60px"
                    borderRadius="full"
                    mx="auto"
                    mb={3}
                    objectFit="cover"
                  />
                  <Text fontWeight="semibold" fontSize="sm">
                    {category.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {category.productCount} items
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
