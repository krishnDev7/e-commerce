'use client';

import { ForgotPasswordForm } from '@ecommerce/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement actual forgot password logic
      console.log('Reset password for email:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful email send
      setIsEmailSent(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleForgotPassword}
      onBackToLogin={handleBackToLogin}
      isLoading={isLoading}
      error={error}
      isEmailSent={isEmailSent}
    />
  );
}
