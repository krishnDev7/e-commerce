import { Box, Skeleton, SkeletonText, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';

export const ProductCardSkeleton = () => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" shadow="sm" p={4}>
    <Skeleton height="200px" borderRadius="md" mb={4} />
    <VStack align="stretch" spacing={3}>
      <SkeletonText mt="4" noOfLines={2} spacing="2" skeletonHeight="2" />
      <HStack justify="space-between">
        <Skeleton height="24px" width="80px" />
        <Skeleton height="24px" width="60px" />
      </HStack>
      <Skeleton height="40px" width="100%" />
    </VStack>
  </Box>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <Grid
    templateColumns={{
      base: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    }}
    gap={6}
  >
    {Array.from({ length: count }).map((_, index) => (
      <GridItem key={index}>
        <ProductCardSkeleton />
      </GridItem>
    ))}
  </Grid>
);

export const ProductDetailSkeleton = () => (
  <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
    {/* Image Gallery Skeleton */}
    <VStack spacing={4}>
      <Skeleton height="400px" width="100%" borderRadius="lg" />
      <HStack spacing={2} width="100%">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height="80px" width="80px" borderRadius="md" />
        ))}
      </HStack>
    </VStack>

    {/* Product Info Skeleton */}
    <VStack align="stretch" spacing={6}>
      <SkeletonText noOfLines={2} spacing="4" skeletonHeight="6" />
      <HStack>
        <Skeleton height="32px" width="100px" />
        <Skeleton height="32px" width="80px" />
      </HStack>
      <SkeletonText noOfLines={4} spacing="3" skeletonHeight="3" />

      {/* Options */}
      <VStack align="stretch" spacing={4}>
        <Box>
          <Skeleton height="20px" width="60px" mb={2} />
          <HStack spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height="40px" width="40px" borderRadius="md" />
            ))}
          </HStack>
        </Box>

        <Box>
          <Skeleton height="20px" width="40px" mb={2} />
          <HStack spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="40px" width="60px" borderRadius="md" />
            ))}
          </HStack>
        </Box>
      </VStack>

      {/* Action Buttons */}
      <VStack spacing={3}>
        <Skeleton height="48px" width="100%" />
        <Skeleton height="48px" width="100%" />
      </VStack>
    </VStack>
  </Grid>
);

export const CartItemSkeleton = () => (
  <HStack spacing={4} p={4} borderWidth="1px" borderRadius="lg" bg="white">
    <Skeleton height="80px" width="80px" borderRadius="md" flexShrink={0} />
    <VStack align="stretch" flex={1} spacing={2}>
      <SkeletonText noOfLines={2} spacing="2" skeletonHeight="3" />
      <HStack justify="space-between">
        <Skeleton height="20px" width="60px" />
        <Skeleton height="32px" width="100px" />
      </HStack>
    </VStack>
  </HStack>
);

export const CategorySkeleton = () => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg="white"
    shadow="sm"
    cursor="pointer"
    transition="all 0.2s"
    _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
  >
    <Skeleton height="120px" width="100%" />
    <Box p={4}>
      <SkeletonText noOfLines={1} skeletonHeight="4" />
    </Box>
  </Box>
);

export const CategoriesGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <Grid
    templateColumns={{
      base: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(6, 1fr)',
    }}
    gap={4}
  >
    {Array.from({ length: count }).map((_, index) => (
      <GridItem key={index}>
        <CategorySkeleton />
      </GridItem>
    ))}
  </Grid>
);
