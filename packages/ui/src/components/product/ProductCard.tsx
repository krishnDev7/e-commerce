import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { HeartIcon, ShoppingCartIcon } from '../navigation/icons';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  isInWishlist?: boolean;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  isInWishlist = false,
}: ProductCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      maxW="sm"
      bg={bgColor}
      borderColor={borderColor}
      shadow="sm"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
      }}
      transition="all 0.3s ease"
      cursor="pointer"
      onClick={() => onViewDetails?.(product)}
    >
      <Box position="relative">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt || product.name}
          height="250px"
          width="100%"
          objectFit="cover"
          borderTopRadius="lg"
        />

        {/* Badges */}
        <VStack position="absolute" top={2} left={2} spacing={1} align="flex-start">
          {product.isNew && (
            <Badge colorScheme="green" fontSize="xs">
              NEW
            </Badge>
          )}
          {product.isOnSale && discount > 0 && (
            <Badge colorScheme="red" fontSize="xs">
              -{discount}%
            </Badge>
          )}
        </VStack>

        {/* Wishlist Button */}
        <IconButton
          position="absolute"
          top={2}
          right={2}
          aria-label="Add to wishlist"
          icon={<HeartIcon />}
          size="sm"
          variant="solid"
          bg={isInWishlist ? 'red.500' : 'white'}
          color={isInWishlist ? 'white' : 'gray.600'}
          _hover={{
            bg: isInWishlist ? 'red.600' : 'gray.100',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
        />

        {!product.inStock && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopRadius="lg"
          >
            <Badge colorScheme="red" fontSize="md" p={2}>
              Out of Stock
            </Badge>
          </Box>
        )}
      </Box>

      <CardBody>
        <Stack spacing={3}>
          <Badge colorScheme="purple" width="fit-content" fontSize="xs">
            {product.category}
          </Badge>

          <Heading size="md" noOfLines={2}>
            {product.name}
          </Heading>

          {product.description && (
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {product.description}
            </Text>
          )}

          <HStack justify="space-between" align="center">
            <VStack spacing={0} align="flex-start">
              <HStack>
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  ${product.price.toFixed(2)}
                </Text>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                    ${product.originalPrice.toFixed(2)}
                  </Text>
                )}
              </HStack>

              {product.rating && (
                <HStack spacing={1} fontSize="sm">
                  <Text color="yellow.500">★</Text>
                  <Text>{product.rating}</Text>
                  {product.reviewCount && <Text color="gray.500">({product.reviewCount})</Text>}
                </HStack>
              )}
            </VStack>
          </HStack>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter>
        <ButtonGroup spacing={2} width="100%">
          <Button
            variant="solid"
            colorScheme="brand"
            size="sm"
            flex={1}
            leftIcon={<ShoppingCartIcon />}
            isDisabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
          >
            View
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
