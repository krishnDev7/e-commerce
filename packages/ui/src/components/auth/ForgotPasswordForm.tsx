'use client';

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Link,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
  onBackToLogin?: () => void;
  isLoading?: boolean;
  error?: string;
  isEmailSent?: boolean;
}

export const ForgotPasswordForm = ({
  onSubmit,
  onBackToLogin,
  isLoading = false,
  error,
  isEmailSent = false,
}: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit?.(email);
    }
  };

  if (isEmailSent) {
    return (
      <Container maxW="md" py={12}>
        <VStack spacing={8}>
          <VStack spacing={4} textAlign="center">
            <Text fontSize="6xl">📧</Text>
            <Heading size="xl" color="secondary.800">
              Check your email
            </Heading>
            <Text color="secondary.600" textAlign="center">
              We've sent a password reset link to{' '}
              <Text as="span" fontWeight="semibold" color="brand.500">
                {email}
              </Text>
            </Text>
          </VStack>

          <Card bg={bgColor} borderColor={borderColor} shadow="lg" width="100%">
            <CardBody p={8}>
              <VStack spacing={6}>
                <Alert status="success" borderRadius="md">
                  <AlertIcon />
                  Password reset email sent successfully!
                </Alert>

                <Text fontSize="sm" color="secondary.600" textAlign="center">
                  Didn't receive the email? Check your spam folder or{' '}
                  <Link
                    color="brand.500"
                    onClick={() => onSubmit?.(email)}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    resend the email
                  </Link>
                </Text>

                <Button
                  variant="outline"
                  width="100%"
                  onClick={onBackToLogin}
                >
                  Back to Login
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Heading size="xl" color="secondary.800">
            Forgot password?
          </Heading>
          <Text color="secondary.600">
            No worries, we'll send you reset instructions
          </Text>
        </VStack>

        {/* Forgot Password Form */}
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

                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Sending..."
                >
                  Reset Password
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Back to Login */}
        <HStack spacing={1}>
          <Text color="secondary.600">Remember your password?</Text>
          <Link
            color="brand.500"
            fontWeight="semibold"
            onClick={onBackToLogin}
            _hover={{ textDecoration: 'underline' }}
          >
            Back to login
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};
