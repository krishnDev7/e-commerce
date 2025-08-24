'use client';

import {
  Box,
  Button,
  Checkbox,
  Container,
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
  FormHelperText,
  Progress,
} from '@chakra-ui/react';
import { useState } from 'react';

interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void;
  onSignInClick?: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
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

// Password strength checker
const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const strengthMap = {
    0: { label: 'Very Weak', color: 'red' },
    1: { label: 'Weak', color: 'red' },
    2: { label: 'Fair', color: 'orange' },
    3: { label: 'Good', color: 'yellow' },
    4: { label: 'Strong', color: 'green' },
    5: { label: 'Very Strong', color: 'green' },
  };

  return { score, ...strengthMap[score as keyof typeof strengthMap] };
};

export const SignUpForm = ({
  onSubmit,
  onSignInClick,
  isLoading = false,
  error,
}: SignUpFormProps) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms' as any;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleInputChange = (field: keyof SignUpFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'agreeToTerms' || field === 'subscribeNewsletter' 
      ? e.target.checked 
      : e.target.value;

    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Heading size="xl" color="secondary.800">
            Create your account
          </Heading>
          <Text color="secondary.600">
            Join us and start your shopping journey
          </Text>
        </VStack>

        {/* Sign Up Form */}
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

                {/* Name Fields */}
                <HStack spacing={4} width="100%">
                  <FormControl isRequired isInvalid={!!errors.firstName}>
                    <FormLabel>First name</FormLabel>
                    <Input
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      placeholder="John"
                      size="lg"
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.lastName}>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      placeholder="Doe"
                      size="lg"
                    />
                  </FormControl>
                </HStack>

                {/* Email */}
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="john@example.com"
                    size="lg"
                  />
                  {errors.email && (
                    <FormHelperText color="red.500">{errors.email}</FormHelperText>
                  )}
                </FormControl>

                {/* Password */}
                <FormControl isRequired isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      placeholder="Create a strong password"
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
                  
                  {formData.password && (
                    <Box mt={2}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="sm" color="secondary.600">
                          Password strength:
                        </Text>
                        <Text fontSize="sm" fontWeight="medium" color={`${passwordStrength.color}.500`}>
                          {passwordStrength.label}
                        </Text>
                      </HStack>
                      <Progress
                        value={(passwordStrength.score / 5) * 100}
                        size="sm"
                        colorScheme={passwordStrength.color}
                        borderRadius="full"
                      />
                    </Box>
                  )}
                  
                  {errors.password && (
                    <FormHelperText color="red.500">{errors.password}</FormHelperText>
                  )}
                </FormControl>

                {/* Confirm Password */}
                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
                      placeholder="Confirm your password"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        icon={showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.confirmPassword && (
                    <FormHelperText color="red.500">{errors.confirmPassword}</FormHelperText>
                  )}
                </FormControl>

                {/* Terms and Newsletter */}
                <VStack spacing={3} align="stretch">
                  <Checkbox
                    isChecked={formData.agreeToTerms}
                    onChange={handleInputChange('agreeToTerms')}
                    colorScheme="brand"
                    isInvalid={!!errors.agreeToTerms}
                  >
                    <Text fontSize="sm">
                      I agree to the{' '}
                      <Link color="brand.500" _hover={{ textDecoration: 'underline' }}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link color="brand.500" _hover={{ textDecoration: 'underline' }}>
                        Privacy Policy
                      </Link>
                    </Text>
                  </Checkbox>

                  <Checkbox
                    isChecked={formData.subscribeNewsletter}
                    onChange={handleInputChange('subscribeNewsletter')}
                    colorScheme="brand"
                  >
                    <Text fontSize="sm">
                      Subscribe to our newsletter for updates and exclusive offers
                    </Text>
                  </Checkbox>
                </VStack>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                >
                  Create Account
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Social Sign Up */}
        <Card bg={bgColor} borderColor={borderColor} shadow="sm" width="100%">
          <CardBody p={6}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="secondary.600">
                Or sign up with
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

        {/* Sign In Link */}
        <HStack spacing={1}>
          <Text color="secondary.600">Already have an account?</Text>
          <Link
            color="brand.500"
            fontWeight="semibold"
            onClick={onSignInClick}
            _hover={{ textDecoration: 'underline' }}
          >
            Sign in
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};
