import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Card,
  CardBody,
  Badge,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { CloseIcon } from '../navigation/icons';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  maxQuantity?: number;
  variant?: {
    size?: string;
    color?: string;
  };
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && (!item.maxQuantity || value <= item.maxQuantity)) {
      onUpdateQuantity?.(item.id, value);
    }
  };

  return (
    <Card bg={bgColor} borderColor={borderColor} shadow="sm">
      <CardBody>
        <HStack spacing={4} align="flex-start">
          {/* Product Image */}
          <Image
            src={item.imageUrl}
            alt={item.name}
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
            flexShrink={0}
          />

          {/* Product Details */}
          <VStack align="stretch" flex={1} spacing={2}>
            <HStack justify="space-between">
              <Text fontWeight="semibold" fontSize="lg" noOfLines={2}>
                {item.name}
              </Text>
              <IconButton
                aria-label="Remove item"
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => onRemove?.(item.id)}
              />
            </HStack>

            {/* Variants */}
            {item.variant && (
              <HStack spacing={3}>
                {item.variant.color && (
                  <Badge colorScheme="blue" fontSize="xs">
                    {item.variant.color}
                  </Badge>
                )}
                {item.variant.size && (
                  <Badge colorScheme="purple" fontSize="xs">
                    Size: {item.variant.size}
                  </Badge>
                )}
              </HStack>
            )}

            {/* Price and Quantity */}
            <Flex justify="space-between" align="center" mt="auto">
              <VStack spacing={1} align="flex-start">
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  ${item.price.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </VStack>

              <HStack spacing={2}>
                <Text fontSize="sm" color="gray.600">
                  Qty:
                </Text>
                <NumberInput
                  size="sm"
                  maxW="80px"
                  value={item.quantity}
                  min={1}
                  max={item.maxQuantity || 99}
                  onChange={(_, value) => handleQuantityChange(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Flex>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  onCheckout?: () => void;
  isLoading?: boolean;
}

export const CartSummary = ({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  total,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card bg={bgColor} borderColor={borderColor} shadow="sm" position="sticky" top={4}>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="semibold">
            Order Summary
          </Text>

          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text>Subtotal:</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </HStack>

            {shipping > 0 && (
              <HStack justify="space-between">
                <Text>Shipping:</Text>
                <Text>${shipping.toFixed(2)}</Text>
              </HStack>
            )}

            {tax > 0 && (
              <HStack justify="space-between">
                <Text>Tax:</Text>
                <Text>${tax.toFixed(2)}</Text>
              </HStack>
            )}

            {discount > 0 && (
              <HStack justify="space-between" color="green.500">
                <Text>Discount:</Text>
                <Text>-${discount.toFixed(2)}</Text>
              </HStack>
            )}
          </VStack>

          <Divider />

          <HStack justify="space-between" fontSize="lg" fontWeight="bold">
            <Text>Total:</Text>
            <Text color="brand.500">${total.toFixed(2)}</Text>
          </HStack>

          <Button
            colorScheme="brand"
            size="lg"
            isLoading={isLoading}
            loadingText="Processing..."
            onClick={onCheckout}
          >
            Proceed to Checkout
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};
