import { HeroBanner } from '@ecommerce/ui';
import nextDynamic from 'next/dynamic';
import { Container, VStack, Heading, Text, Box } from '@chakra-ui/react';

// Use dynamic import to avoid hydration issues with React Query
const ProductsGrid = nextDynamic(() => import('./products-grid'), { ssr: false });
const CategoriesSection = nextDynamic(() => import('./categories-section'), { ssr: false });

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <main>
      <HeroBanner />

      {/* Categories Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading size="xl" mb={4} color="secondary.800">
                Shop by Category
              </Heading>
              <Text fontSize="lg" color="secondary.600" maxW="2xl" mx="auto">
                Discover our wide range of products across different categories
              </Text>
            </Box>
            <CategoriesSection />
          </VStack>
        </Container>
      </Box>

      {/* Featured Products */}
      <Box py={16}>
        <Container maxW="7xl">
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading size="xl" mb={4} color="secondary.800">
                Featured Products
              </Heading>
              <Text fontSize="lg" color="secondary.600" maxW="2xl" mx="auto">
                Check out our most popular and trending products
              </Text>
            </Box>
            <ProductsGrid />
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
