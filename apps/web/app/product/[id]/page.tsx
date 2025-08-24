'use client';

import {
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Divider,
  Box,
  Image,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { HeartIcon, ShoppingCartIcon } from '@ecommerce/ui';
import { useState } from 'react';
import Link from 'next/link';

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  variants: {
    colors: Array<{ name: string; value: string; available: boolean }>;
    sizes: Array<{ name: string; available: boolean }>;
  };
  features: string[];
  specifications: Array<{ label: string; value: string }>;
}

const mockProduct: ProductDetail = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description:
    'Experience superior sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.',
  price: 199.99,
  originalPrice: 249.99,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1564424224651-efa22a965494?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  ],
  category: 'Electronics',
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  stockCount: 15,
  variants: {
    colors: [
      { name: 'Black', value: '#000000', available: true },
      { name: 'White', value: '#FFFFFF', available: true },
      { name: 'Blue', value: '#1E40AF', available: false },
      { name: 'Red', value: '#DC2626', available: true },
    ],
    sizes: [{ name: 'One Size', available: true }],
  },
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium materials',
    'Wireless connectivity',
    'Quick charge (5 min = 3 hours)',
    'Built-in microphone',
  ],
  specifications: [
    { label: 'Driver', value: '40mm Dynamic' },
    { label: 'Frequency Response', value: '20Hz - 20kHz' },
    { label: 'Impedance', value: '32Ω' },
    { label: 'Battery Life', value: '30 hours' },
    { label: 'Charging Time', value: '2 hours' },
    { label: 'Weight', value: '250g' },
    { label: 'Connectivity', value: 'Bluetooth 5.0' },
    { label: 'Warranty', value: '2 years' },
  ],
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.variants.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(mockProduct.variants.sizes[0].name);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const discount = mockProduct.originalPrice
    ? Math.round(
        ((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      product: mockProduct,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

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
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">{mockProduct.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{mockProduct.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Product Details */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Image Gallery */}
          <GridItem>
            <VStack spacing={4}>
              {/* Main Image */}
              <Box
                position="relative"
                width="100%"
                height="400px"
                bg={bgColor}
                borderRadius="lg"
                overflow="hidden"
                border="1px"
                borderColor={borderColor}
                cursor="zoom-in"
                onClick={onOpen}
              >
                <Image
                  src={mockProduct.images[selectedImage]}
                  alt={mockProduct.name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
                {discount > 0 && (
                  <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    colorScheme="red"
                    fontSize="md"
                    px={3}
                    py={1}
                  >
                    -{discount}% OFF
                  </Badge>
                )}
              </Box>

              {/* Thumbnail Images */}
              <SimpleGrid columns={4} spacing={2} width="100%">
                {mockProduct.images.map((image, index) => (
                  <Box
                    key={index}
                    height="80px"
                    bg={bgColor}
                    borderRadius="md"
                    overflow="hidden"
                    border="2px"
                    borderColor={index === selectedImage ? 'brand.500' : borderColor}
                    cursor="pointer"
                    onClick={() => setSelectedImage(index)}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: 'brand.500',
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </GridItem>

          {/* Product Info */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Title and Rating */}
              <Box>
                <Badge colorScheme="purple" mb={2}>
                  {mockProduct.category}
                </Badge>
                <Heading size="xl" mb={2}>
                  {mockProduct.name}
                </Heading>
                <HStack spacing={2}>
                  <HStack>
                    <Text color="yellow.500" fontSize="lg">
                      ★
                    </Text>
                    <Text fontWeight="semibold">{mockProduct.rating}</Text>
                  </HStack>
                  <Text color="gray.500">({mockProduct.reviewCount} reviews)</Text>
                </HStack>
              </Box>

              {/* Price */}
              <HStack spacing={3} align="baseline">
                <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                  ${mockProduct.price.toFixed(2)}
                </Text>
                {mockProduct.originalPrice && (
                  <Text fontSize="xl" color="gray.500" textDecoration="line-through">
                    ${mockProduct.originalPrice.toFixed(2)}
                  </Text>
                )}
              </HStack>

              {/* Description */}
              <Text color="gray.600" lineHeight="tall">
                {mockProduct.description}
              </Text>

              {/* Color Selection */}
              <Box>
                <Text fontWeight="semibold" mb={3}>
                  Color: {selectedColor}
                </Text>
                <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                  <HStack spacing={3}>
                    {mockProduct.variants.colors.map((color) => (
                      <Box key={color.name} position="relative">
                        <Radio
                          value={color.name}
                          isDisabled={!color.available}
                          colorScheme="brand"
                          size="lg"
                        >
                          <Box
                            width="6"
                            height="6"
                            borderRadius="full"
                            bg={color.value}
                            border="2px"
                            borderColor={color.available ? 'gray.300' : 'gray.200'}
                            ml={2}
                          />
                        </Radio>
                        {!color.available && (
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            width="8"
                            height="0.5"
                            bg="red.500"
                            transform="translate(-50%, -50%) rotate(45deg)"
                          />
                        )}
                      </Box>
                    ))}
                  </HStack>
                </RadioGroup>
              </Box>

              {/* Quantity */}
              <HStack spacing={4}>
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Quantity:
                  </Text>
                  <NumberInput
                    value={quantity}
                    onChange={(_, value) => setQuantity(value)}
                    min={1}
                    max={mockProduct.stockCount}
                    maxW="100px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    {mockProduct.stockCount} items available
                  </Text>
                </Box>
              </HStack>

              {/* Action Buttons */}
              <VStack spacing={3}>
                <Button
                  size="lg"
                  colorScheme="brand"
                  width="100%"
                  leftIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  isDisabled={!mockProduct.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  width="100%"
                  leftIcon={<HeartIcon />}
                  onClick={handleToggleWishlist}
                  colorScheme={isInWishlist ? 'red' : 'gray'}
                >
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </VStack>

              {/* Stock Status */}
              <Box>
                {mockProduct.inStock ? (
                  <Badge colorScheme="green" fontSize="sm">
                    ✓ In Stock
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="sm">
                    Out of Stock
                  </Badge>
                )}
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        <Divider />

        {/* Product Details Tabs */}
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Features</Tab>
            <Tab>Specifications</Tab>
            <Tab>Reviews</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Key Features</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {mockProduct.features.map((feature, index) => (
                    <HStack key={index} spacing={3}>
                      <Box
                        width="6px"
                        height="6px"
                        borderRadius="full"
                        bg="brand.500"
                        flexShrink={0}
                        mt={1}
                      />
                      <Text>{feature}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Technical Specifications</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {mockProduct.specifications.map((spec, index) => (
                    <HStack key={index} justify="space-between">
                      <Text fontWeight="medium">{spec.label}:</Text>
                      <Text color="gray.600">{spec.value}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Customer Reviews</Heading>
                <Text color="gray.600">
                  Reviews feature coming soon! This product has {mockProduct.reviewCount} reviews
                  with an average rating of {mockProduct.rating} stars.
                </Text>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Image
              src={mockProduct.images[selectedImage]}
              alt={mockProduct.name}
              width="100%"
              height="auto"
              maxHeight="80vh"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
