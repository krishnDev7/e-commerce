'use client';

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Link,
  Heading,
  Divider,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

const footerLinks = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/track' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Refund Policy', href: '/refunds' },
    ],
  },
  categories: {
    title: 'Categories',
    links: [
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Fashion', href: '/categories/fashion' },
      { label: 'Home & Garden', href: '/categories/home-garden' },
      { label: 'Books', href: '/categories/books' },
    ],
  },
};

export default function Footer() {
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const textColor = useColorModeValue('gray.300', 'gray.300');
  const headingColor = useColorModeValue('white', 'white');
  const borderColor = useColorModeValue('gray.700', 'gray.700');

  return (
    <Box bg={bgColor} color={textColor} mt={20}>
      <Container maxW="7xl" py={16}>
        <VStack spacing={12} align="stretch">
          {/* Main Footer Content */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={8}>
            {/* Brand Section */}
            <VStack align="flex-start" spacing={4}>
              <Box>
                <Heading size="lg" color={headingColor} mb={2}>
                  <Text as="span" mr={2}>
                    🛍️
                  </Text>
                  ShopHub
                </Heading>
                <Text fontSize="sm" lineHeight="tall">
                  Your one-stop destination for quality products at amazing prices. Discover, shop,
                  and enjoy a seamless e-commerce experience.
                </Text>
              </Box>

              {/* Social Links */}
              <HStack spacing={3}>
                <IconButton
                  aria-label="Facebook"
                  variant="ghost"
                  size="sm"
                  color={textColor}
                  _hover={{ color: 'brand.400', bg: 'gray.800' }}
                >
                  📘
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  variant="ghost"
                  size="sm"
                  color={textColor}
                  _hover={{ color: 'brand.400', bg: 'gray.800' }}
                >
                  🐦
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  variant="ghost"
                  size="sm"
                  color={textColor}
                  _hover={{ color: 'brand.400', bg: 'gray.800' }}
                >
                  📷
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  variant="ghost"
                  size="sm"
                  color={textColor}
                  _hover={{ color: 'brand.400', bg: 'gray.800' }}
                >
                  💼
                </IconButton>
              </HStack>
            </VStack>

            {/* Footer Link Sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <VStack key={key} align="flex-start" spacing={3}>
                <Heading size="sm" color={headingColor}>
                  {section.title}
                </Heading>
                <VStack align="flex-start" spacing={2}>
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      fontSize="sm"
                      _hover={{
                        color: 'brand.400',
                        textDecoration: 'none',
                      }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>

          <Divider borderColor={borderColor} />

          {/* Newsletter Section */}
          <VStack spacing={4} textAlign="center">
            <Heading size="md" color={headingColor}>
              Stay Updated
            </Heading>
            <Text fontSize="sm" maxW="md">
              Subscribe to our newsletter and get 10% off your first order. Be the first to know
              about new products and exclusive deals.
            </Text>
            <HStack maxW="400px" width="100%">
              <Box
                as="input"
                placeholder="Enter your email"
                bg="gray.800"
                border="1px"
                borderColor={borderColor}
                color={headingColor}
                px={4}
                py={2}
                borderRadius="md"
                flex={1}
                _focus={{
                  borderColor: 'brand.500',
                  outline: 'none',
                }}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Box
                as="button"
                bg="brand.500"
                color="white"
                px={6}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight="semibold"
                _hover={{
                  bg: 'brand.600',
                }}
                transition="background-color 0.2s"
              >
                Subscribe
              </Box>
            </HStack>
          </VStack>

          <Divider borderColor={borderColor} />

          {/* Bottom Section */}
          <HStack
            justify="space-between"
            align="center"
            flexDirection={{ base: 'column', md: 'row' }}
            spacing={{ base: 4, md: 0 }}
          >
            <Text fontSize="sm" color="gray.500">
              © 2025 ShopHub. All rights reserved.
            </Text>
            <HStack spacing={6} fontSize="sm">
              <Text color="gray.500">We accept:</Text>
              <HStack spacing={2}>
                <Text>💳</Text>
                <Text>🏦</Text>
                <Text>📱</Text>
                <Text>💰</Text>
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
