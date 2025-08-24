'use client';

import { LoginForm, LoginFormData } from '@ecommerce/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement actual login logic
      console.log('Login data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      router.push('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  const handleForgotPasswordClick = () => {
    router.push('/forgot-password');
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onSignUpClick={handleSignUpClick}
      onForgotPasswordClick={handleForgotPasswordClick}
      isLoading={isLoading}
      error={error}
    />
  );
}
