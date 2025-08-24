'use client';

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
  </svg>
);

export const LoginForm = ({
  onSubmit,
  onSignUpClick,
  onForgotPasswordClick,
  isLoading = false,
  error,
}: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'rememberMe' ? e.target.checked : e.target.value,
    }));
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Heading size="xl" color="secondary.800">
            Welcome back
          </Heading>
          <Text color="secondary.600">
            Sign in to your account to continue shopping
          </Text>
        </VStack>

        {/* Login Form */}
        <Card bg={bgColor} borderColor={borderColor} shadow="lg" width="100%">
          <CardBody p={8}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {/* Email */}
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Enter your email"
                    size="lg"
                  />
                </FormControl>

                {/* Password */}
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Remember Me & Forgot Password */}
                <HStack justify="space-between" width="100%">
                  <Checkbox
                    isChecked={formData.rememberMe}
                    onChange={handleInputChange('rememberMe')}
                    colorScheme="brand"
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    color="brand.500"
                    fontSize="sm"
                    onClick={onForgotPasswordClick}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Forgot password?
                  </Link>
                </HStack>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Social Login */}
        <Card bg={bgColor} borderColor={borderColor} shadow="sm" width="100%">
          <CardBody p={6}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="secondary.600">
                Or continue with
              </Text>
              
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} width="100%">
                <Button
                  variant="outline"
                  leftIcon={<Text>🔍</Text>}
                  flex={1}
                  size="md"
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Text>📘</Text>}
                  flex={1}
                  size="md"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Text>🍎</Text>}
                  flex={1}
                  size="md"
                >
                  Apple
                </Button>
              </Stack>
            </VStack>
          </CardBody>
        </Card>

        {/* Sign Up Link */}
        <HStack spacing={1}>
          <Text color="secondary.600">Don't have an account?</Text>
          <Link
            color="brand.500"
            fontWeight="semibold"
            onClick={onSignUpClick}
            _hover={{ textDecoration: 'underline' }}
          >
            Sign up
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};
