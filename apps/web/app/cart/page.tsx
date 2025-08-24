'use client';

import {
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Divider,
  Box,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { CartItemCard, CartSummary, CartItem } from '@ecommerce/ui';
import { useState } from 'react';
import Link from 'next/link';

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quantity: 1,
    maxQuantity: 5,
    variant: {
      color: 'Black',
      size: 'One Size',
    },
  },
  {
    id: '2',
    name: 'Smartphone Case',
    price: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quantity: 2,
    maxQuantity: 10,
    variant: {
      color: 'Blue',
    },
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quantity: 1,
    maxQuantity: 3,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCheckoutLoading(false);
    console.log('Proceeding to checkout...');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Cart</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Box textAlign="center" py={20}>
            <Text fontSize="6xl" mb={4}>
              🛒
            </Text>
            <Heading size="lg" mb={4}>
              Your cart is empty
            </Heading>
            <Text color="gray.600" mb={8}>
              Looks like you haven't added any items to your cart yet.
            </Text>
            <Button as={Link} href="/" colorScheme="brand" size="lg">
              Continue Shopping
            </Button>
          </Box>
        </VStack>
      </Container>
    );
  }

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
            <BreadcrumbLink>Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Header */}
        <HStack justify="space-between" align="center">
          <Heading size="xl">Shopping Cart</Heading>
          <Text color="gray.600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Text>
        </HStack>

        {/* Free shipping notice */}
        {subtotal < 100 && (
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            Add ${(100 - subtotal).toFixed(2)} more to your order to qualify for free shipping!
          </Alert>
        )}

        {/* Cart Content */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Cart Items */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </VStack>
          </GridItem>

          {/* Order Summary */}
          <GridItem>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
              isLoading={isCheckoutLoading}
            />
          </GridItem>
        </Grid>

        <Divider />

        {/* Continue Shopping */}
        <HStack justify="space-between">
          <Button as={Link} href="/" variant="outline" size="lg">
            ← Continue Shopping
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
