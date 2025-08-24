'use client';

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Avatar,
  Text,
  Badge,
  InputGroup,
  Input,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  HeartIcon,
} from './icons';

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

const Links: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Categories',
    href: '/categories',
    children: [
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Clothing', href: '/categories/clothing' },
      { label: 'Books', href: '/categories/books' },
      { label: 'Home & Garden', href: '/categories/home-garden' },
    ],
  },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
];

interface NavigationProps {
  cartItemCount?: number;
  wishlistItemCount?: number;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar?: string;
    email: string;
  };
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onProfileClick?: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const NavLink = ({
  children,
  href,
  hasChildren,
}: {
  children: React.ReactNode;
  href: string;
  hasChildren?: boolean;
}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color={useColorModeValue('secondary.700', 'secondary.200')}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('brand.50', 'brand.900'),
      color: useColorModeValue('brand.600', 'brand.200'),
    }}
    href={href}
    display="flex"
    alignItems="center"
  >
    {children}
    {hasChildren && <ChevronDownIcon ml={1} />}
  </Link>
);

export default function Navigation({
  cartItemCount = 0,
  wishlistItemCount = 0,
  isAuthenticated = false,
  user,
  onSearch,
  onCartClick,
  onWishlistClick,
  onProfileClick,
  onSignIn,
  onSignOut,
}: NavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        px={4}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="sm"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="7xl" mx="auto">
          {/* Logo */}
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="xl" color="brand.500">
              <Text as="span" mr={2}>
                🛍️
              </Text>
              ShopHub
            </Box>

            {/* Desktop Navigation */}
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Box key={link.label}>
                  {link.children ? (
                    <Menu>
                      <MenuButton
                        as={Button}
                        variant="ghost"
                        size="sm"
                        rightIcon={<ChevronDownIcon />}
                        color={useColorModeValue('secondary.700', 'secondary.200')}
                        _hover={{
                          bg: useColorModeValue('brand.50', 'brand.900'),
                          color: useColorModeValue('brand.600', 'brand.200'),
                        }}
                      >
                        {link.label}
                      </MenuButton>
                      <MenuList>
                        {link.children.map((child) => (
                          <MenuItem key={child.label} as={Link} href={child.href}>
                            {child.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  ) : (
                    <NavLink href={link.href}>{link.label}</NavLink>
                  )}
                </Box>
              ))}
            </HStack>
          </HStack>

          {/* Search Bar */}
          <Box flex={1} maxW="400px" mx={4} display={{ base: 'none', lg: 'block' }}>
            <InputGroup>
              <Input
                placeholder="Search products..."
                bg={useColorModeValue('gray.50', 'gray.700')}
                border="1px"
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{
                  borderColor: 'brand.300',
                }}
                _focus={{
                  borderColor: 'brand.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  size="sm"
                  variant="ghost"
                  color="secondary.500"
                />
              </InputRightElement>
            </InputGroup>
          </Box>

          {/* Right side actions */}
          <Flex alignItems={'center'}>
            <HStack spacing={2}>
              {/* Mobile Search */}
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="ghost"
                display={{ base: 'flex', lg: 'none' }}
              />

              {/* Wishlist */}
              <Box position="relative">
                <IconButton
                  aria-label="Wishlist"
                  icon={<HeartIcon />}
                  variant="ghost"
                  onClick={onWishlistClick}
                />
                {wishlistItemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="xs"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
              </Box>

              {/* Cart */}
              <Box position="relative">
                <IconButton
                  aria-label="Shopping cart"
                  icon={<ShoppingCartIcon />}
                  variant="ghost"
                  onClick={onCartClick}
                />
                {cartItemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorScheme="brand"
                    borderRadius="full"
                    fontSize="xs"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Box>

              {/* User Menu */}
              {isAuthenticated && user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                    p={0}
                  >
                    <Avatar size={'sm'} src={user.avatar} name={user.name} />
                  </MenuButton>
                  <MenuList>
                    <Box px={3} py={2}>
                      <Text fontWeight="semibold">{user.name}</Text>
                      <Text fontSize="sm" color="secondary.500">
                        {user.email}
                      </Text>
                    </Box>
                    <MenuDivider />
                    <MenuItem onClick={onProfileClick}>Profile</MenuItem>
                    <MenuItem>Orders</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={onSignOut}>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button variant="outline" size="sm" onClick={onSignIn}>
                  Sign In
                </Button>
              )}

              {/* Mobile menu button */}
              <IconButton
                aria-label="Open menu"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant="ghost"
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
            </HStack>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {/* Mobile Search */}
              <Box>
                <InputGroup>
                  <Input placeholder="Search products..." />
                  <InputRightElement>
                    <IconButton
                      aria-label="Search"
                      icon={<SearchIcon />}
                      size="sm"
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Divider />

              {/* Navigation Links */}
              {Links.map((link) => (
                <Box key={link.label}>
                  <Link
                    href={link.href}
                    py={2}
                    display="block"
                    fontWeight="medium"
                    _hover={{
                      color: 'brand.500',
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <VStack spacing={1} align="stretch" ml={4} mt={2}>
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          py={1}
                          fontSize="sm"
                          color="secondary.600"
                          _hover={{
                            color: 'brand.500',
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </VStack>
                  )}
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
