'use client';

import { SignUpForm, SignUpFormData } from '@ecommerce/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement actual sign up logic
      console.log('Sign up data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful sign up
      router.push('/login?message=Account created successfully. Please sign in.');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInClick = () => {
    router.push('/login');
  };

  return (
    <SignUpForm
      onSubmit={handleSignUp}
      onSignInClick={handleSignInClick}
      isLoading={isLoading}
      error={error}
    />
  );
}
