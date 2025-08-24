'use client';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <Box
      as="section"
      position="relative"
      py={28}
      px={8}
      bgGradient="linear(to-r, brand.500, brand.300)"
      color="white"
      overflow="hidden"
    >
      <Stack maxW="6xl" mx="auto" spacing={8} align="flex-start">
        <Heading size="2xl" lineHeight="1.1">
          Discover products that elevate your lifestyle
        </Heading>
        <Text fontSize="xl" maxW="2xl">
          Curated quality, sustainable choices, and irresistible offers. Shop the new season
          collection now.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Button
            size="lg"
            colorScheme="whiteAlpha"
            bg="white"
            color="brand.600"
            _hover={{ bg: 'brand.50' }}
          >
            Shop Now
          </Button>
          <Button size="lg" variant="outline" borderColor="white" _hover={{ bg: 'whiteAlpha.200' }}>
            View Categories
          </Button>
        </Stack>
      </Stack>
      <Box
        position="absolute"
        inset={0}
        opacity={0.15}
        bgImage="radial-gradient(circle at 25% 25%, #fff, transparent 60%)"
      />
    </Box>
  );
};
